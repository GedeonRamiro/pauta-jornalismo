import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateCameraDto {
  @MinLength(3, { message: 'Nome muito curto!' })
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  identifierNumber: number;
}
