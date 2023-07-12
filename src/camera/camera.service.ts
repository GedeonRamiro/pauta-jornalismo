import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCameraDto } from './dtos/createCamera.dto';
import { UpdateCameraDto } from './dtos/UpdateCamera.dto';
import { CameraEntity } from './entities/camera.entity';

@Injectable()
export class CameraService {
  constructor(
    @InjectRepository(CameraEntity)
    private readonly cameraRepository: Repository<CameraEntity>,
  ) {}

  async createCamera(createCameraDto: CreateCameraDto): Promise<CameraEntity> {
    await this.existIdentifierNumberCamera(createCameraDto.identifierNumber);
    return await this.cameraRepository.save(createCameraDto);
  }

  async getAllCamera(): Promise<CameraEntity[]> {
    return await this.cameraRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async getCameraById(id: string): Promise<CameraEntity> {
    const camera = await this.cameraRepository.findOne({
      where: { id },
      relations: {
        pauta: true,
      },
    });
    if (!camera)
      throw new NotFoundException(`Camera com id: ${id} não existe!`);
    return camera;
  }

  async updatePatchCamera(
    id: string,
    updateCameraDto: UpdateCameraDto,
  ): Promise<CameraEntity> {
    const camera = await this.getCameraById(id);

    if (
      updateCameraDto.identifierNumber &&
      camera.identifierNumber !== updateCameraDto.identifierNumber
    ) {
      await this.existIdentifierNumberCamera(updateCameraDto.identifierNumber);
    }
    updateCameraDto.updateAt = new Date();

    const cameraUpdate = await this.cameraRepository.update(
      id,
      updateCameraDto,
    );

    if (!cameraUpdate) {
      throw new NotFoundException('Propriedade passada no body inválida!');
    }
    return this.getCameraById(id);
  }

  async deleteCamera(id: string): Promise<{ message: string }> {
    const camera = await this.getCameraById(id);
    await this.cameraRepository.delete(id);
    return { message: `${camera.name} excluido com sucesso!` };
  }

  async existIdentifierNumberCamera(
    identifierNumber: number,
  ): Promise<boolean> {
    const camera = await this.cameraRepository.findOneBy({
      identifierNumber,
    });

    if (camera) {
      throw new BadGatewayException(
        `Número identificador ${identifierNumber} já está sendo usado!`,
      );
    }

    return true;
  }
}
