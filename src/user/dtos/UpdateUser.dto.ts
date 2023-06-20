import { IsDate, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @MinLength(3, { message: 'Nome muito curto!' })
  name: string;

  @IsOptional()
  @MinLength(9, { message: 'Número de telefone muito curto!' })
  phone: string;

  @IsOptional()
  @IsString({ message: 'Id do cargo deve ser uma string!' })
  office_id: string;

  @IsOptional()
  @IsDate()
  updateAt: Date;
}
