import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @MinLength(3, { message: 'Nome muito curto!' })
  @IsString()
  name: string;

  @IsEmail(undefined, { message: 'Formato de e-mail digitado não é valido!' })
  email: string;

  @MinLength(9, { message: 'Número de telefone muito curto!' })
  @IsString()
  phone: string;

  @MinLength(9, { message: 'Número de telefone muito curto!' })
  @IsString()
  cpf: string;

  @MinLength(6, { message: 'Senha deve ser no mínimo 6 caracteres!' })
  @IsString()
  password: string;
}
