import { IsString, MinLength } from 'class-validator';

export class CreateVehicleDto {
  @MinLength(3, { message: 'Modelo com nome muito curto!' })
  @IsString()
  model: string;

  @MinLength(3, { message: 'Fabricante com nome muito curto!' })
  @IsString()
  manufacturer: string;

  @MinLength(7, { message: 'Placa no mínimo 7 caracteres!' })
  @IsString()
  plate: string;

  @MinLength(3, { message: 'Use pelo menos 3 caracteres!' })
  @IsString()
  color: string;
}
