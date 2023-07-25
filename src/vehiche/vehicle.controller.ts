import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from 'src/decorator/roles.decorator';
import { UserType } from 'src/user/enums/role.enum';
import { CreateVehicleDto } from './dtos/CreateVehicle.dto';
import { ReturnVehicleDto } from './dtos/ReturnVehicle.dto';
import { UpDateVehicleDto } from './dtos/UpdateVehicle.dto';
import { VehicleEntity } from './entities/vehicle.entity';
import { ReturnVehichePagination } from './interface/ReturnVehichePagination';
import { VehicleService } from './vehicle.service';

@Roles(UserType.Admin)
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

  @Roles(UserType.Admin, UserType.UserIntermediary)
  @Get()
  async getAllVehicle(
    @Query() { limit, page, filter },
  ): Promise<ReturnVehichePagination> {
    const resultVehice = await this.vehicleService.getAllVehicle(
      parseInt(limit || 10),
      parseInt(page || 1),
      filter || '',
    );

    const vehicle = resultVehice.data.map(
      (vehicle) => new ReturnVehicleDto({ ...vehicle }),
    );

    return { ...resultVehice, data: vehicle };
  }

  @Roles(UserType.Admin, UserType.UserIntermediary)
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
  async deleteVehicle(@Param('id') id: string): Promise<{ message: string }> {
    return await this.vehicleService.deleteVehicle(id);
  }
}
