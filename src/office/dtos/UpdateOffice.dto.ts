import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MinLength,
} from 'class-validator';
import { CreateOfficeDto } from './CreateOffice.dto';

export class UpdateOfficeDto extends CreateOfficeDto {
  @IsOptional()
  @MinLength(3, { message: 'Nome muito curto!' })
  name: string;

  @IsOptional()
  @IsDate()
  updateAt: Date;
}
