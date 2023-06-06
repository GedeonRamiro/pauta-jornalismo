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
import { Role } from 'src/enums/role.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const saltOrRounds = 10;

    /* const passwordHashed = await hash(createUserDto.password, saltOrRounds); */

    await this.existEmail(createUserDto.email);

    return await this.userRepository.save({
      ...createUserDto,
      typeUser: Role.User,
      /* password: passwordHashed, */
    });
  }

  async getAlUser(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async getUserById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`Usuário com id: ${id} não existe!`);

    return user;
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
