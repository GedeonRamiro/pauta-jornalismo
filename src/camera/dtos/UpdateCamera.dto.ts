import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { CreateCameraDto } from './createCamera.dto';

export class UpdateCameraDto extends CreateCameraDto {
  @IsOptional()
  @IsDate()
  updateAt: Date;
}
