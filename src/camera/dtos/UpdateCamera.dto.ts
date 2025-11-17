import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MinLength,
} from 'class-validator';
import { CreateCameraDto } from './CreateCamera.dto';

export class UpdateCameraDto extends CreateCameraDto {
  @IsOptional()
  @MinLength(3, { message: 'Nome muito curto!' })
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  identifierNumber: number;

  @IsOptional()
  @IsDate()
  updateAt: Date;
}
