import { VehicleEntity } from '../entities/vehicle.entity';

export class ReturnVehicleDto {
  id: string;
  model: string;
  manufacturer: string;
  plate: string;
  color: string;

  constructor(camera: VehicleEntity) {
    this.id = camera.id;
    this.model = camera.model;
    this.manufacturer = camera.manufacturer;
    this.plate = camera.plate;
    this.color = camera.color;
  }
}
