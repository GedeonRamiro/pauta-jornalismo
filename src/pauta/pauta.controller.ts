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
import { UserId } from 'src/decorator/user-id.decorator';
import { CreatePautaDto } from './dtos/CreatePauta.dto';
import { ReturnPautaDto } from './dtos/ReturnPauta.dto';
import { UpdatePautaDto } from './dtos/UpdatePauta.dto';
import { PautaEntity } from './entities/pauta.entity';
import { PautaService } from './pauta.service';

@Controller('pauta')
export class PautaController {
  constructor(private readonly pautaService: PautaService) {}

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
    return new ReturnPautaDto(await this.pautaService.getPautaById(id));
  }

  @UsePipes(ValidationPipe)
  @Put(':id')
  async updatePutUser(
    @Param('id') id: string,
    @Body() updatePutUser: UpdatePautaDto,
    @UserId('userId') userId: string,
  ): Promise<ReturnPautaDto> {
    return new ReturnPautaDto(
      await this.pautaService.updatePutPauta(id, updatePutUser, userId),
    );
  }

  @Delete(':id')
  async deletePauta(@Param('id') id: string) {
    return await this.pautaService.deletePauta(id);
  }
}
