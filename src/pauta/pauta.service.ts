import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePautaDto } from './dtos/CreatePautaDto';
import { PautaEntity } from './entities/pauta.entity';

@Injectable()
export class PautaService {
  constructor(
    @InjectRepository(PautaEntity)
    private readonly pautaRepository: Repository<PautaEntity>,
  ) {}

  async createPauta(createPautaDto: CreatePautaDto, userId: string) {
    return await this.pautaRepository.save({
      ...createPautaDto,
      userId,
    });
  }

  async getAllPauta(): Promise<PautaEntity[]> {
    const pauta = await this.pautaRepository.find();
    return pauta;
  }

  async getPautaById(id: string): Promise<PautaEntity> {
    const pauta = await this.pautaRepository.findOne({
      where: { id },
      relations: {
        camera: true,
        vehicle: true,
        user: true,
      },
    });
    if (!pauta) throw new NotFoundException(`Pauta com id: ${id} não existe!`);
    return pauta;
  }

  async deletePauta(id: string) {
    const pauta = await this.getPautaById(id);
    await this.pautaRepository.delete(id);
    return {
      message: `Pauta: ${pauta.name} excluido com sucesso!`,
    };
  }
}
