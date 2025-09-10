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
import { UserType } from '../user/enums/role.enum';
import { UpdateUserDto } from './dtos/UpdateUser.dto';
import { OfficeService } from '../office/office.service';
import { PautaService } from '../pauta/pauta.service';
import { createPagination } from '../utils/pagination';
import { ReturnUserPagination } from './interface/ReturnUserPagination';
import { ReturnUserPaginationById } from './interface/ReturnUserPaginationById';
import { Environment } from '../enums/role.environment';
import { ReturnUserPautaPagination } from './interface/ReturnUserPautaPagination';

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
    });
    if (!user) throw new NotFoundException(`User com id: ${id} não existe!`);
    return user;
  }

  async getUserPautaCreateById(
    id: string,
    page: number,
  ): Promise<ReturnUserPaginationById> {
    if (isNaN(Number(page))) {
      throw new NotAcceptableException('Página ou limite formato invalido!');
    }

    const offset = (page - 1) * Environment.LINE_LIMIT;

    const user = await this.userRepository
      .createQueryBuilder('user')
      .where({ id })
      .leftJoinAndSelect('user.pauta', 'pauta')
      .orderBy({
        ' pauta.createdAt': 'DESC',
      })
      .limit(Environment.LINE_LIMIT)
      .offset(offset)
      .loadRelationCountAndMap('user.count', 'user.pauta')
      .getOne();

    if (!user) throw new NotFoundException(`Usuário ou página não existe!`);

    const pagination = createPagination(
      Environment.LINE_LIMIT,
      page,
      user.count,
    );

    return {
      data: user,
      ...pagination,
    };
  }

  async getUserPauta(
    userId: string,
    page: number,
  ): Promise<ReturnUserPautaPagination> {
    if (isNaN(Number(page))) {
      throw new NotAcceptableException('Página ou limite formato invalido!');
    }

    const offset = (page - 1) * Environment.LINE_LIMIT;

    const user = await this.userRepository
      .createQueryBuilder('user')
      .where({ id: userId })
      .leftJoinAndSelect('user.pauta', 'pauta')
      .orderBy({
        ' pauta.createdAt': 'DESC',
      })
      .limit(Environment.LINE_LIMIT)
      .offset(offset)
      .getOne();

    if (!user) throw new NotFoundException(`Usuário ou página não existe!`);

    const pauta = (await this.pautaService.getAllPauta()).flatMap((item) => {
      try {
        const parsed = JSON.parse(item.team);
        return Array.isArray(parsed) && parsed.includes(user.id) ? [item] : [];
      } catch {
        return [];
      }
    });

    const pagination = createPagination(
      Environment.LINE_LIMIT,
      page,
      pauta.length,
    );

    return { data: { ...user, pauta: pauta }, ...pagination };
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    if (!email) {
      throw new NotFoundException(`Email: ${email} Not Found`);
    }
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
    if (!password) {
      throw new NotFoundException(`Password: ${password} Not Found`);
    }
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
