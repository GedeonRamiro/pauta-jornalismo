import {
  BadGatewayException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Environment } from 'src/enums/role.environment';
import { PautaEntity } from 'src/pauta/entities/pauta.entity';
import { createPagination } from 'src/utils/pagination';
import { Like, Repository } from 'typeorm';
import { CreateCameraDto } from './dtos/createCamera.dto';
import { UpdateCameraDto } from './dtos/UpdateCamera.dto';
import { CameraEntity } from './entities/camera.entity';
import { ReturnCameraPagination } from './interface/ReturnCameraPagination';

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

  async getAllCamera(
    limit: number,
    page: number,
    filter: string,
  ): Promise<ReturnCameraPagination> {
    if (isNaN(Number(page) && Number(limit))) {
      throw new NotAcceptableException('Página ou limite formato invalido!');
    }

    const skip = (page - 1) * limit;
    const [result, total] = await this.cameraRepository.findAndCount({
      where: { name: Like('%' + filter + '%') },
      take: limit,
      skip: skip,

      order: {
        createdAt: 'DESC',
      },
    });
    const pagination = createPagination(limit, page, total);
    return {
      data: [...result],
      ...pagination,
    };
  }

  /*  async getCameraById(id: string): Promise<any> {
    const [data, total]: any = await this.cameraRepository
      .createQueryBuilder('camera')
      .where({ id })
      .leftJoinAndSelect('camera.pauta', 'pauta')
      .limit(2)
      .loadRelationCountAndMap('camera.count', 'camera.pauta')
      .getMany();

    //console.log(data.count as number);

    //const pagination = createPagination(Environment.CURRENT_PAGE, Environment.LINE_LIMIT, camera.);
    console.log(data.count);
    return data;
  } */

  async getCameraById(id: string): Promise<CameraEntity> {
    const camera = await this.cameraRepository.findOne({
      where: { id },
      relations: {
        pauta: true,
      },
      order: {
        createdAt: 'DESC',
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
