import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CameraService } from '../camera/camera.service';
import { ReturnOfficeDto } from '../office/dtos/ReturnOffice.dto';
import { UserService } from '../user/users.service';
import { VehicleService } from '../vehiche/vehicle.service';
import { Like, Repository } from 'typeorm';
import { CreatePautaDto } from './dtos/CreatePauta.dto';
import { ReturnTeamDto } from './dtos/ReturnTeam.dto';
import { UpdatePautaDto } from './dtos/UpdatePauta.dto';
import { PautaEntity } from './entities/pauta.entity';
import { ReturnPautaPagination } from './interface/ReturnPautaPagination';
import { createPagination } from '../utils/pagination';

@Injectable()
export class PautaService {
  constructor(
    @InjectRepository(PautaEntity)
    private readonly pautaRepository: Repository<PautaEntity>,
    private readonly userService: UserService,
    private readonly vehicleService: VehicleService,
    private readonly cameraService: CameraService,
  ) {}

  /*     async createPauta(
    createPautaDto: CreatePautaDto,
    userId: string,
  ): Promise<PautaEntity> {
    await this.userService.getUserById(userId);
    await this.vehicleService.getVehicleById(createPautaDto.vehicleId);
    await this.cameraService.getCameraById(createPautaDto.cameraId);

    await this.getAllTeam(JSON.stringify(createPautaDto.team));

    return await this.pautaRepository.save({
      ...createPautaDto,
      team: JSON.stringify(createPautaDto.team),
      userId,
    });
  }  */

  async createPauta(
    createPautaDto: CreatePautaDto,
    userId: string,
  ): Promise<PautaEntity> {
    await this.userService.getUserById(userId);
    await this.vehicleService.getVehicleById(createPautaDto.vehicleId);
    await this.cameraService.getCameraById(createPautaDto.cameraId);

    await this.getAllTeam(createPautaDto.team);

    return await this.pautaRepository.save({
      ...createPautaDto,
      team: JSON.stringify(createPautaDto.team),
      userId,
    });
  }

  async getAllPauta(): Promise<PautaEntity[]> {
    return await this.pautaRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async getAllPautaPagination(
    limit: number,
    page: number,
    filter: string,
  ): Promise<ReturnPautaPagination> {
    if (isNaN(Number(page) && Number(limit))) {
      throw new NotAcceptableException('Página ou limite formato invalido!');
    }

    const skip = (page - 1) * limit;
    const [result, total] = await this.pautaRepository.findAndCount({
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

  private async getAllTeam(team: any): Promise<ReturnTeamDto[] | null> {
    if (typeof team === 'string') {
      try {
        team = JSON.parse(team);
      } catch {
        return null;
      }
    }

    if (!Array.isArray(team)) return null;

    return await Promise.all(
      team.map(async (id: string) => {
        const user = await this.userService.getUserById(id);

        return {
          id: user.id,
          name: user.name,
          office: user.office ? new ReturnOfficeDto(user.office) : undefined,
        };
      }),
    );
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

    const usersTeam = await this.getAllTeam(pauta.team);

    return { ...pauta, teams: usersTeam };
  }

  async updatePutPauta(
    id: string,
    updatePautaDto: UpdatePautaDto,
    userId: string,
  ): Promise<PautaEntity> {
    await this.userService.getUserById(userId);
    await this.vehicleService.getVehicleById(updatePautaDto.vehicleId);
    await this.cameraService.getCameraById(updatePautaDto.cameraId);

    updatePautaDto.updateAt = new Date();

    if (updatePautaDto.team) {
      await this.getAllTeam(JSON.stringify(updatePautaDto.team));
    }

    const pauta = await this.getPautaById(id);

    const userUpdate = await this.pautaRepository.update(id, {
      ...updatePautaDto,
      team: updatePautaDto.team
        ? JSON.stringify(updatePautaDto.team)
        : pauta.team,
    });

    if (!userUpdate) {
      throw new NotFoundException('Propriedade passada no body inválida!');
    }

    const usersTeam = await this.getAllTeam(
      updatePautaDto.team ? JSON.stringify(updatePautaDto.team) : pauta.team,
    );

    return { ...pauta, teams: usersTeam };
  }

  async deletePauta(id: string): Promise<{ message: string }> {
    const pauta = await this.getPautaById(id);
    await this.pautaRepository.delete(id);
    return {
      message: `Pauta: ${pauta.name} excluido com sucesso!`,
    };
  }
}
