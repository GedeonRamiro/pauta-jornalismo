import { IsDate, IsOptional } from 'class-validator';
import { CreateVehicleDto } from './CreateVehicle.dto';

export class UpDateVehicleDto extends CreateVehicleDto {
  @IsOptional()
  @IsDate()
  updateAt: Date;
}
