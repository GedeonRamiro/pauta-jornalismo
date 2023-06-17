import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreatePautaDto {
  @IsOptional()
  @IsString({ message: 'Id da camera deve ser uma string!' })
  cameraId: string;

  @IsOptional()
  @IsString({ message: 'Id do veículo deve ser uma string!' })
  vehicleId: string;

  @MinLength(3, { message: 'Nome da puata muito curta!' })
  name: string;

  @MinLength(5, { message: 'Informação da pauta imcompleta!' })
  infomation: string;
}
