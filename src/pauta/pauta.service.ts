import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CameraService } from 'src/camera/camera.service';
import { UserService } from 'src/user/users.service';
import { VehicleService } from 'src/vehiche/vehicle.service';
import { Repository } from 'typeorm';
import { CreatePautaDto } from './dtos/CreatePauta.dto';
import { UpdatePautaDto } from './dtos/UpdatePauta.dto';
import { PautaEntity } from './entities/pauta.entity';

@Injectable()
export class PautaService {
  constructor(
    @InjectRepository(PautaEntity)
    private readonly pautaRepository: Repository<PautaEntity>,
    private readonly userService: UserService,
    private readonly vehicleService: VehicleService,
    private readonly cameraService: CameraService,
  ) {}

  async createPauta(createPautaDto: CreatePautaDto, userId: string) {
    await this.userService.getUserById(userId);
    await this.vehicleService.getVehicleById(createPautaDto.vehicleId);
    await this.cameraService.getCameraById(createPautaDto.cameraId);

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

  async updatePutPauta(
    id: string,
    updatePautaDto: UpdatePautaDto,
    userId: string,
  ) {
    await this.userService.getUserById(userId);
    await this.vehicleService.getVehicleById(updatePautaDto.vehicleId);
    await this.cameraService.getCameraById(updatePautaDto.cameraId);
    updatePautaDto.updateAt = new Date();
    const userUpdate = await this.pautaRepository.update(id, updatePautaDto);

    if (!userUpdate) {
      throw new NotFoundException('Propriedade passada no body inválida!');
    }
    return this.getPautaById(id);
  }

  async deletePauta(id: string) {
    const pauta = await this.getPautaById(id);
    await this.pautaRepository.delete(id);
    return {
      message: `Pauta: ${pauta.name} excluido com sucesso!`,
    };
  }
}
