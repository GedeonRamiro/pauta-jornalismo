import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReturnCameraDto } from '../camera/dtos/ReturnCamera.dto';
import { Roles } from '../decorator/roles.decorator';
import { UserId } from '../decorator/user-id.decorator';
import { ReturnUserDto } from '../user/dtos/ReturnUser.dto';
import { UserType } from '../user/enums/role.enum';
import { ReturnVehicleDto } from '../vehiche/dtos/ReturnVehicle.dto';
import { CreatePautaDto } from './dtos/CreatePauta.dto';
import { ReturnPautaDto } from './dtos/ReturnPauta.dto';
import { UpdatePautaDto } from './dtos/UpdatePauta.dto';
import { PautaEntity } from './entities/pauta.entity';
import { ReturnPautaPagination } from './interface/ReturnPautaPagination';
import { PautaService } from './pauta.service';

@Roles(UserType.User, UserType.UserIntermediary, UserType.Admin)
@Controller('pauta')
export class PautaController {
  constructor(private readonly pautaService: PautaService) {}

  @Roles(UserType.UserIntermediary, UserType.Admin)
  @Post()
  @UsePipes(ValidationPipe)
  async createPauta(
    @Body() createPauta: CreatePautaDto,
    @UserId('userId') userId: string,
  ): Promise<PautaEntity> {
    return await this.pautaService.createPauta(createPauta, userId);
  }

  @Roles(UserType.UserIntermediary, UserType.Admin)
  @Get()
  async getAllPauta(
    @Query() { limit, page, filter },
  ): Promise<ReturnPautaPagination> {
    const resultPauta = await this.pautaService.getAllPautaPagination(
      parseInt(limit || 10),
      parseInt(page || 1),
      filter || '',
    );

    const pauta = resultPauta.data.map(
      (pauta) => new ReturnPautaDto({ ...pauta }),
    );

    return { ...resultPauta, data: pauta };
  }

  @Get(':id')
  async getPautaById(@Param('id') id: string): Promise<ReturnPautaDto> {
    const pauta = await this.pautaService.getPautaById(id);

    const newPauta = {
      id: pauta.id,
      name: pauta.name,
      infomation: pauta.infomation,
      createdAt: pauta.createdAt,
      user: new ReturnUserDto(pauta.user),
      camera: pauta.camera ? new ReturnCameraDto(pauta.camera) : null,
      vehicle: pauta.vehicle ? new ReturnVehicleDto(pauta.vehicle) : null,
      teams: pauta.teams ? pauta.teams : null,
    };
    return newPauta;
  }

  @Roles(UserType.UserIntermediary, UserType.Admin)
  @UsePipes(ValidationPipe)
  @Put(':id')
  async updatePutPauta(
    @Param('id') id: string,
    @Body() updatePutPauta: UpdatePautaDto,
    @UserId('userId') userId: string,
  ): Promise<ReturnPautaDto> {
    await this.pautaService.getPautaById(id);

    const pauta = await this.pautaService.updatePutPauta(
      id,
      updatePutPauta,
      userId,
    );

    const updatePauta = {
      id: pauta.id,
      name: pauta.name,
      infomation: pauta.infomation,
      createdAt: pauta.createdAt,
      user: new ReturnUserDto(pauta.user),
      camera: pauta.camera ? new ReturnCameraDto(pauta.camera) : null,
      vehicle: pauta.vehicle ? new ReturnVehicleDto(pauta.vehicle) : null,
      teams: pauta.teams ? pauta.teams : null,
    };
    return updatePauta;
  }

  @Roles(UserType.UserIntermediary, UserType.Admin)
  @Delete(':id')
  async deletePauta(@Param('id') id: string): Promise<{ message: string }> {
    return await this.pautaService.deletePauta(id);
  }
}
