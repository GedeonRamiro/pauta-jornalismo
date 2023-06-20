import { MinLength } from 'class-validator';

export class CreateOfficeDto {
  @MinLength(3, { message: 'Nome muito curto!' })
  name: string;
}
