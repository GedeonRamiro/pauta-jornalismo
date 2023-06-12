import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateVehicleDto } from './dtos/CreateVehicle.dto';
import { ReturnVehicleDto } from './dtos/ReturnVehicle.dto';
import { VehicleEntity } from './entities/vehicle.entity';
import { VehicleService } from './vehicle.service';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createVehicle(
    @Body() createVehicle: CreateVehicleDto,
  ): Promise<VehicleEntity> {
    return await this.vehicleService.createVehicle(createVehicle);
  }

  @Get()
  async getAllVehicle(): Promise<ReturnVehicleDto[]> {
    const vehicles = (await this.vehicleService.getAllVehicle()).map(
      (vehicle) => new ReturnVehicleDto(vehicle),
    );
    return vehicles;
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<ReturnVehicleDto> {
    return new ReturnVehicleDto(await this.vehicleService.getVehicleById(id));
  }

  @Delete(':id')
  async deleteVehicle(@Param('id') id: string) {
    return await this.vehicleService.deleteVehicle(id);
  }
}
