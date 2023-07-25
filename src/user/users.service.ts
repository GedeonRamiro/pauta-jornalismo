import {
  BadGatewayException,
  forwardRef,
  Inject,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
/* import { hash } from 'bcrypt'; */
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UserType } from 'src/user/enums/role.enum';
import { UpdateUserDto } from './dtos/UpdateUser.dto';
import { OfficeService } from 'src/office/office.service';
import { PautaService } from 'src/pauta/pauta.service';
import { createPagination } from 'src/utils/pagination';
import { ReturnUserPagination } from './interface/ReturnUserPagination';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly officeService: OfficeService,
    @Inject(forwardRef(() => PautaService))
    private readonly pautaService: PautaService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    //const saltOrRounds = 10;

    /* const passwordHashed = await hash(createUserDto.password, saltOrRounds); */

    await this.existEmail(createUserDto.email);
    await this.officeService.getOfficeById(createUserDto.office_id);

    return await this.userRepository.save({
      ...createUserDto,
      typeUser: UserType.User,
      /* password: passwordHashed, */
    });
  }

  async getAllUser(
    limit: number,
    page: number,
    filter: string,
  ): Promise<ReturnUserPagination> {
    if (isNaN(Number(page) && Number(limit))) {
      throw new NotAcceptableException('Página ou limite formato invalido!');
    }

    const skip = (page - 1) * limit;
    const [result, total] = await this.userRepository.findAndCount({
      where: { name: Like('%' + filter + '%') },
      take: limit,
      skip: skip,
      order: {
        createdAt: 'DESC',
      },
    });
    const pagination = createPagination(limit, page, total);
    return {
      data: [...result],
      ...pagination,
    };
  }

  async getUserById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        pauta: true,
        office: true,
      },
    });

    if (!user) throw new NotFoundException(`Usuário com id: ${id} não existe!`);

    return user;
  }

  async getUserPauta(Userid: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id: Userid },
      relations: {
        pauta: true,
        office: true,
      },
    });

    if (!user)
      throw new NotFoundException(`Usuário com id: ${Userid} não existe!`);

    const pauta = await (await this.pautaService.getAllPauta())
      .map((team) =>
        JSON.parse(team.team).includes(user.id) ? team : undefined,
      )
      .filter((team) => team ?? team);

    const sortByDate = [...user.pauta, ...pauta].sort((a, b) => {
      return a.createdAt.getTime() + b.createdAt.getTime();
    });

    return { ...user, pauta: sortByDate };
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException(`Email: ${email} Not Found`);
    }

    return user;
  }

  async updatePutUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    updateUserDto.updateAt = new Date();
    await this.officeService.getOfficeById(updateUserDto.office_id);
    const userUpdate = await this.userRepository.update(id, updateUserDto);

    if (!userUpdate) {
      throw new NotFoundException('Propriedade passada no body inválida!');
    }
    return this.getUserById(id);
  }

  async deleteUser(id: string): Promise<{ message: string }> {
    const user = await this.getUserById(id);
    await this.userRepository.delete(id);
    return { message: `${user.name} excluido com sucesso!` };
  }

  async isMatchPassword(password: string) {
    const user = await this.userRepository.findOne({
      where: {
        password,
      },
    });

    if (!user) {
      throw new NotFoundException(`Password: ${password} Not Found`);
    }

    return true;
  }

  async existEmail(email: string): Promise<boolean> {
    const user = await this.userRepository.findOneBy({
      email,
    });

    if (user) {
      throw new BadGatewayException(
        `E-mail ${email} já existe na base de dados!`,
      );
    }

    return true;
  }
}
