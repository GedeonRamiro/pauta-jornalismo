import { IsDate, IsOptional, MinLength } from 'class-validator';

export class UpdateUserDto {
  @MinLength(3, { message: 'Nome muito curto!' })
  name: string;

  @MinLength(9, { message: 'Número de telefone muito curto!' })
  phone: string;

  @IsOptional()
  @IsDate()
  updateAt: Date;
}
