import { CameraEntity } from '../entities/camera.entity';

export class ReturnCameraDto {
  id: string;
  name: string;
  identifierNumber: number;

  constructor(camera: CameraEntity) {
    this.id = camera.id;
    this.name = camera.name;
    this.identifierNumber = camera.identifierNumber;
  }
}
