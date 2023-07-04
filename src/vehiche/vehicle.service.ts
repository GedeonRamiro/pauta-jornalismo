import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleEntity } from './entities/vehicle.entity';
import { CreateVehicleDto } from './dtos/CreateVehicle.dto';
import { UpDateVehicleDto } from './dtos/UpdateVehicle.dto';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(VehicleEntity)
    private readonly vehicleRepository: Repository<VehicleEntity>,
  ) {}

  async createVehicle(
    createVehicleDto: CreateVehicleDto,
  ): Promise<VehicleEntity> {
    await this.existPlateVehicle(createVehicleDto.plate);
    return await this.vehicleRepository.save(createVehicleDto);
  }

  async getAllVehicle(): Promise<VehicleEntity[]> {
    return await this.vehicleRepository.find();
  }

  async getVehicleById(id: string): Promise<VehicleEntity> {
    const vehicle = await this.vehicleRepository.findOne({
      where: { id },
      relations: {
        pauta: true,
      },
    });
    if (!vehicle)
      throw new NotFoundException(`Veículo com id: ${id} não existe!`);
    return vehicle;
  }

  async updatePatchVehicle(
    id: string,
    updateVehicleDto: UpDateVehicleDto,
  ): Promise<VehicleEntity> {
    const vehicle = await this.getVehicleById(id);

    if (vehicle.plate !== updateVehicleDto.plate && updateVehicleDto.plate) {
      await this.existPlateVehicle(updateVehicleDto.plate);
    }
    updateVehicleDto.updateAt = new Date();

    const vehicleUpdate = await this.vehicleRepository.update(
      id,
      updateVehicleDto,
    );

    if (!vehicleUpdate) {
      throw new NotFoundException('Propriedade passada no body inválida!');
    }
    return this.getVehicleById(id);
  }

  async deleteVehicle(id: string): Promise<{ message: string }> {
    const vehicle = await this.getVehicleById(id);
    await this.vehicleRepository.delete(id);
    return {
      message: `${vehicle.model} de cor: ${vehicle.color} e placa: ${vehicle.plate} excluido com sucesso!`,
    };
  }

  async existPlateVehicle(plate: string): Promise<boolean> {
    const vehicle = await this.vehicleRepository.findOneBy({
      plate,
    });

    if (vehicle) {
      throw new BadGatewayException(`Placa ${plate} já cadastrada!`);
    }

    return true;
  }
}
