import { IsString, MinLength } from 'class-validator';

export class CreatePautaDto {
  @IsString()
  userId: string;

  @IsString()
  cameraId: string;

  @IsString()
  vehicleId: string;

  @MinLength(3, { message: 'Noma da puata muito curta!' })
  @IsString()
  name: string;

  @MinLength(5, { message: 'Informação da pauta imcompleta!' })
  @IsString()
  infomation: string;
}
