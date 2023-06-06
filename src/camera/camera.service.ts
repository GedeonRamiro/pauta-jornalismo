import { BadGatewayException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCameraDto } from './dtos/createCamera.dto';
import { CameraEntity } from './entities/camera.entity';

@Injectable()
export class CameraService {
  constructor(
    @InjectRepository(CameraEntity)
    private readonly cameraRepository: Repository<CameraEntity>,
  ) {}

  async createCamera(createCameraDto: CreateCameraDto) {
    await this.existIdentifierNumberCamera(createCameraDto.identifierNumber);
    return await this.cameraRepository.save(createCameraDto);
  }

  async getAllCamera(): Promise<CameraEntity[]> {
    const camera = await this.cameraRepository.find();
    return camera;
  }

  async existIdentifierNumberCamera(identifierNumber: number) {
    const user = await this.cameraRepository.findOneBy({
      identifierNumber,
    });

    if (user) {
      throw new BadGatewayException(
        `Número identificador ${identifierNumber} já está sendo usado!`,
      );
    }

    return true;
  }
}
