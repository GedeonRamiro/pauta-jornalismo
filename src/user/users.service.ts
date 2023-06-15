import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
/* import { hash } from 'bcrypt'; */
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UserType } from 'src/user/enums/role.enum';
import { UpdateUserDto } from './dtos/UpdateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    //const saltOrRounds = 10;

    /* const passwordHashed = await hash(createUserDto.password, saltOrRounds); */

    await this.existEmail(createUserDto.email);

    return await this.userRepository.save({
      ...createUserDto,
      typeUser: UserType.User,
      /* password: passwordHashed, */
    });
  }

  async getAlUser(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async getUserById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        pauta: true,
      },
    });
    if (!user) throw new NotFoundException(`Usuário com id: ${id} não existe!`);

    return user;
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

  async updatePutUser(id: string, updateUserDto: UpdateUserDto) {
    updateUserDto.updateAt = new Date();
    const userUpdate = await this.userRepository.update(id, updateUserDto);

    if (!userUpdate) {
      throw new NotFoundException('Propriedade passada no body inválida!');
    }
    return this.getUserById(id);
  }

  async deleteUser(id: string) {
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

  async existEmail(email: string) {
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
