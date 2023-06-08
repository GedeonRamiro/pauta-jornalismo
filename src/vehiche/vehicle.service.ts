import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleEntity } from './entities/vehicle.entity';
import { CreateVehicleDto } from './dtos/CreateVehicle.dto';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(VehicleEntity)
    private readonly vehicleRepository: Repository<VehicleEntity>,
  ) {}

  async createVehicle(createVehicleDto: CreateVehicleDto) {
    await this.existPlateVehicle(createVehicleDto.plate);
    return await this.vehicleRepository.save(createVehicleDto);
  }

  async getAllVehicle(): Promise<VehicleEntity[]> {
    const vehicle = await this.vehicleRepository.find();
    return vehicle;
  }

  async getVehicleById(id: string): Promise<VehicleEntity> {
    const vehicle = await this.vehicleRepository.findOne({ where: { id } });
    if (!vehicle)
      throw new NotFoundException(`Veículo com id: ${id} não existe!`);
    return vehicle;
  }

  async deleteVehicle(id: string) {
    const vehicle = await this.getVehicleById(id);
    await this.vehicleRepository.delete(id);
    return {
      message: `${vehicle.model} de cor: ${vehicle.color} e placa: ${vehicle.plate} excluido com sucesso!`,
    };
  }

  async existPlateVehicle(plate: string) {
    const vehicle = await this.vehicleRepository.findOneBy({
      plate,
    });

    if (vehicle) {
      throw new BadGatewayException(`Placa ${plate} já cadastrada!`);
    }

    return true;
  }
}
