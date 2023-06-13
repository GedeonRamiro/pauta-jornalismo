import { ReturnPautaDto } from 'src/pauta/dtos/ReturnPauta.dto';
import { CameraEntity } from '../entities/camera.entity';

export class ReturnCameraDto {
  id: string;
  name: string;
  identifierNumber: number;
  pauta: ReturnPautaDto[];

  constructor(camera: CameraEntity) {
    this.id = camera.id;
    this.name = camera.name;
    this.identifierNumber = camera.identifierNumber;
    this.pauta = camera.pauta
      ? camera.pauta.map((pauta) => new ReturnPautaDto(pauta))
      : undefined;
  }
}
