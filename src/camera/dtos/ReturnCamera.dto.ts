import { CameraEntity } from '../entities/camera.entity';

export class ReturnCameraDto {
  name: string;
  identifierNumber: number;

  constructor(camera: CameraEntity) {
    this.name = camera.name;
    this.identifierNumber = camera.identifierNumber;
  }
}
