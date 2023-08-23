import { IsNotEmpty, IsNumber, MinLength } from 'class-validator';

export class CreateCameraDto {
  @MinLength(3, { message: 'Nome muito curto!' })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  identifierNumber: number;
}
