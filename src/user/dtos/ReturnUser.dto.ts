import { UserEntity } from '../entities/user.entity';

export class ReturnuserDto {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;

  constructor(UserEntity: UserEntity) {
    this.id = UserEntity.id;
    this.name = UserEntity.name;
    this.email = UserEntity.email;
    this.phone = UserEntity.phone;
    this.cpf = UserEntity.cpf;
  }
}
