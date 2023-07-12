import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReturnCameraDto } from 'src/camera/dtos/ReturnCamera.dto';
import { Roles } from 'src/decorator/roles.decorator';
import { UserId } from 'src/decorator/user-id.decorator';
import { ReturnUserDto } from 'src/user/dtos/ReturnUser.dto';
import { UserType } from 'src/user/enums/role.enum';
import { ReturnVehicleDto } from 'src/vehiche/dtos/ReturnVehicle.dto';
import { CreatePautaDto } from './dtos/CreatePauta.dto';
import { ReturnPautaDto } from './dtos/ReturnPauta.dto';
import { UpdatePautaDto } from './dtos/UpdatePauta.dto';
import { PautaEntity } from './entities/pauta.entity';
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

  @Get()
  async getAllPauta(): Promise<ReturnPautaDto[]> {
    const pautas = (await this.pautaService.getAllPauta()).map(
      (pauta) => new ReturnPautaDto(pauta),
    );
    return pautas;
  }

  @Get(':id')
  async getPautaById(@Param('id') id: string): Promise<ReturnPautaDto> {
    const pauta = await this.pautaService.getPautaById(id);

    const newPauta = {
      id: pauta.id,
      name: pauta.name,
      infomation: pauta.infomation,
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
