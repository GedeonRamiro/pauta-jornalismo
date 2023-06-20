import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from 'src/decorator/roles.decorator';
import { UserType } from 'src/user/enums/role.enum';
import { CreateVehicleDto } from './dtos/CreateVehicle.dto';
import { ReturnVehicleDto } from './dtos/ReturnVehicle.dto';
import { UpDateVehicleDto } from './dtos/UpdateVehicle.dto';
import { VehicleEntity } from './entities/vehicle.entity';
import { VehicleService } from './vehicle.service';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Roles(UserType.Admin)
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

  @Patch(':id')
  async updatePatchVehicle(
    @Param('id') id: string,
    @Body() updatePutCamera: UpDateVehicleDto,
  ): Promise<ReturnVehicleDto> {
    return new ReturnVehicleDto(
      await this.vehicleService.updatePatchVehicle(id, updatePutCamera),
    );
  }

  @Delete(':id')
  async deleteVehicle(@Param('id') id: string) {
    return await this.vehicleService.deleteVehicle(id);
  }
}
