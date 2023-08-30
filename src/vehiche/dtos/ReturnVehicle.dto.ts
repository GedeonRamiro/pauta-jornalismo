import { ReturnPautaDto } from '../../pauta/dtos/ReturnPauta.dto';
import { VehicleEntity } from '../entities/vehicle.entity';

export class ReturnVehicleDto {
  id: string;
  model: string;
  manufacturer: string;
  plate: string;
  color: string;
  pauta: ReturnPautaDto[];

  constructor(vehicle: VehicleEntity) {
    this.id = vehicle.id;
    this.model = vehicle.model;
    this.manufacturer = vehicle.manufacturer;
    this.plate = vehicle.plate;
    this.color = vehicle.color;
    this.pauta = vehicle.pauta
      ? vehicle.pauta.map((pauta) => new ReturnPautaDto(pauta))
      : undefined;
  }
}
