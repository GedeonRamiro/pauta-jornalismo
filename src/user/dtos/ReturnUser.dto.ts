import { ReturnOfficeDto } from '../../office/dtos/ReturnOffice.dto';
import { ReturnPautaDto } from '../../pauta/dtos/ReturnPauta.dto';
import { UserEntity } from '../entities/user.entity';

export class ReturnUserDto {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  typeUser?: number;
  office: ReturnOfficeDto;
  pauta: ReturnPautaDto[];

  constructor(user: UserEntity) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.phone = user.phone;
    this.cpf = user.cpf;
    this.typeUser = user.typeUser;
    this.office = user.office ? new ReturnOfficeDto(user.office) : undefined;
    this.pauta = user.pauta
      ? user.pauta.map((pauta) => new ReturnPautaDto(pauta))
      : undefined;
  }
}
