import {
  BadGatewayException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { VehicleEntity } from './entities/vehicle.entity';
import { CreateVehicleDto } from './dtos/CreateVehicle.dto';
import { UpDateVehicleDto } from './dtos/UpdateVehicle.dto';
import { ReturnVehichePagination } from './interface/ReturnVehichePagination';
import { createPagination } from '../utils/pagination';

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

  async getAllVehicle(
    limit: number,
    page: number,
    filter: string,
  ): Promise<ReturnVehichePagination> {
    if (isNaN(Number(page) && Number(limit))) {
      throw new NotAcceptableException('Página ou limite formato invalido!');
    }

    const skip = (page - 1) * limit;
    const [result, total] = await this.vehicleRepository.findAndCount({
      where: { model: Like('%' + filter + '%') },
      take: limit,
      skip: skip,
      order: {
        createdAt: 'DESC',
      },
    });
    const pagination = createPagination(limit, page, total);
    return {
      data: [...result],
      ...pagination,
    };
  }

  async getAllVehicleNoPagination(): Promise<{
    data: VehicleEntity[];
    count: number;
  }> {
    const [result, count] = await this.vehicleRepository.findAndCount({
      order: {
        createdAt: 'DESC',
      },
      relations: {
        pauta: true,
      },
    });

    return {
      data: result,
      count,
    };
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
