import { ReturnCameraDto } from '../../camera/dtos/ReturnCamera.dto';
import { ReturnUserDto } from '../../user/dtos/ReturnUser.dto';
import { ReturnVehicleDto } from '../../vehiche/dtos/ReturnVehicle.dto';
import { PautaEntity } from '../entities/pauta.entity';

export class ReturnPautaDto {
  id: string;
  name: string;
  infomation: string;
  teams: any;
  user: ReturnUserDto;
  camera: ReturnCameraDto;
  vehicle: ReturnVehicleDto;

  constructor(pauta: PautaEntity) {
    this.id = pauta.id;
    this.name = pauta.name;
    this.infomation = pauta.infomation;
    this.teams = this.teams;
    this.user = pauta.user ? new ReturnUserDto(pauta.user) : undefined;
    this.camera = pauta.camera ? new ReturnCameraDto(pauta.camera) : undefined;
    this.vehicle = pauta.vehicle
      ? new ReturnVehicleDto(pauta.vehicle)
      : undefined;
  }
}
