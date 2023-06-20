import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOfficeDto } from './dtos/CreateOffice.dto';
import { UpdateOfficeDto } from './dtos/UpdateOffice.dto';
import { OfficeEntity } from './entities/office.entity';

@Injectable()
export class OfficeService {
  constructor(
    @InjectRepository(OfficeEntity)
    private readonly officeRepository: Repository<OfficeEntity>,
  ) {}

  async createOffice(createOfficeDto: CreateOfficeDto) {
    await this.existOfficeName(createOfficeDto.name);
    return await this.officeRepository.save(createOfficeDto);
  }

  async getAllOffice(): Promise<OfficeEntity[]> {
    return await this.officeRepository.find();
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

  async updatePatchOffice(id: string, updateOfficeDto: UpdateOfficeDto) {
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

  async deleteOffice(id: string) {
    const office = await this.getOfficeById(id);
    await this.officeRepository.delete(id);
    return { message: `Cargo ${office.name} excluido com sucesso!` };
  }

  async existOfficeName(name: string) {
    const office = await this.officeRepository.findOneBy({
      name,
    });

    if (office) {
      throw new BadGatewayException(`Cargo ${name} já existe!`);
    }

    return true;
  }
}
