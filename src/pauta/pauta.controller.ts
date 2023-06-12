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
import { CreatePautaDto } from './dtos/CreatePautaDto';
import { ReturnPautaDto } from './dtos/ReturnPautaDto';
import { PautaEntity } from './entities/pauta.entity';
import { PautaService } from './pauta.service';

@Controller('pauta')
export class PautaController {
  constructor(private readonly pautaService: PautaService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createPauta(@Body() createPauta: CreatePautaDto): Promise<PautaEntity> {
    console.log('createPautaControlller:', createPauta);
    return await this.pautaService.createPauta(createPauta);
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

  @Delete(':id')
  async deletePauta(@Param('id') id: string) {
    return await this.pautaService.deletePauta(id);
  }
}
