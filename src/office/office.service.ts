import {
  BadGatewayException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createPagination } from '../utils/pagination';
import { Like, Repository } from 'typeorm';
import { CreateOfficeDto } from './dtos/CreateOffice.dto';
import { UpdateOfficeDto } from './dtos/UpdateOffice.dto';
import { OfficeEntity } from './entities/office.entity';
import { ReturnOfficePagination } from './interface/ReturnOfficePagination';
import { ReturnOfficeDto } from './dtos/ReturnOffice.dto';

@Injectable()
export class OfficeService {
  constructor(
    @InjectRepository(OfficeEntity)
    private readonly officeRepository: Repository<OfficeEntity>,
  ) {}

  async createOffice(createOfficeDto: CreateOfficeDto): Promise<OfficeEntity> {
    await this.existOfficeName(createOfficeDto.name);
    return await this.officeRepository.save(createOfficeDto);
  }

  async getAllOffice(
    limit: number,
    page: number,
    filter: string,
  ): Promise<ReturnOfficePagination> {
    if (isNaN(Number(page) && Number(limit))) {
      throw new NotAcceptableException('Página ou limite formato invalido!');
    }

    const skip = (page - 1) * limit;
    const [result, total] = await this.officeRepository.findAndCount({
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

  async getAllOfficeNoPagination(): Promise<{
    data: OfficeEntity[];
    count: number;
  }> {
    const [result, count] = await this.officeRepository.findAndCount({
      order: {
        createdAt: 'DESC',
      },
    });

    return {
      data: result,
      count,
    };
  }

  async getOfficeById(id: string): Promise<OfficeEntity> {
    const office = await this.officeRepository.findOne({
      where: { id },
      relations: {
        user: true,
      },
    });
    if (!office) throw new NotFoundException(`Cargo com id: ${id} não existe!`);
    return office;
  }

  async updatePatchOffice(
    id: string,
    updateOfficeDto: UpdateOfficeDto,
  ): Promise<OfficeEntity> {
    const office = await this.getOfficeById(id);

    if (updateOfficeDto.name && office.name !== updateOfficeDto.name) {
      await this.existOfficeName(updateOfficeDto.name);
    }
    updateOfficeDto.updateAt = new Date();

    const officeUpdate = await this.officeRepository.update(
      id,
      updateOfficeDto,
    );

    if (!officeUpdate) {
      throw new NotFoundException('Propriedade passada no body inválida!');
    }
    return this.getOfficeById(id);
  }

  async deleteOffice(id: string): Promise<{ message: string }> {
    const office = await this.getOfficeById(id);
    await this.officeRepository.delete(id);
    return { message: `Cargo ${office.name} excluido com sucesso!` };
  }

  async existOfficeName(name: string): Promise<boolean> {
    const office = await this.officeRepository.findOneBy({
      name,
    });

    if (office) {
      throw new BadGatewayException(`Cargo ${name} já existe!`);
    }

    return true;
  }
}
