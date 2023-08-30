import { ReturnUserDto } from '../../user/dtos/ReturnUser.dto';
import { OfficeEntity } from '../entities/office.entity';

export class ReturnOfficeDto {
  id: string;
  name: string;
  user: ReturnUserDto[];

  constructor(office: OfficeEntity) {
    this.id = office.id;
    this.name = office.name;

    this.user = office.user
      ? office.user.map((user) => new ReturnUserDto(user))
      : undefined;
  }
}
