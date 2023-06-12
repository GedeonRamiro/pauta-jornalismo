import { IsString, MinLength } from 'class-validator';

export class CreatePautaDto {
  cameraId: string;

  @MinLength(3, { message: 'Nome do veículo muito curto!' })
  vehicleId: string;

  @MinLength(3, { message: 'Nome da puata muito curta!' })
  name: string;

  @MinLength(5, { message: 'Informação da pauta imcompleta!' })
  infomation: string;
}
