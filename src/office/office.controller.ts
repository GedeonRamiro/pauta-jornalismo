import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from 'src/decorator/roles.decorator';
import { UserType } from 'src/user/enums/role.enum';
import { CreateOfficeDto } from './dtos/CreateOffice.dto';
import { ReturnOfficeDto } from './dtos/ReturnOffice.dto';
import { UpdateOfficeDto } from './dtos/UpdateOffice.dto';
import { OfficeEntity } from './entities/office.entity';
import { OfficeService } from './office.service';

@Roles(UserType.Admin)
@Controller('office')
export class OfficeController {
  constructor(private readonly officeService: OfficeService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createOffice(
    @Body() officeCreate: CreateOfficeDto,
  ): Promise<OfficeEntity> {
    return await this.officeService.createOffice(officeCreate);
  }

  @Get()
  async getAllOffice(): Promise<ReturnOfficeDto[]> {
    const office = (await this.officeService.getAllOffice()).map(
      (office) => new ReturnOfficeDto(office),
    );
    return office;
  }

  @Get(':id')
  async getOfficeById(@Param('id') id: string): Promise<ReturnOfficeDto> {
    return new ReturnOfficeDto(await this.officeService.getOfficeById(id));
  }

  @UsePipes(ValidationPipe)
  @Patch(':id')
  async updatePatchOffice(
    @Param('id') id: string,
    @Body() updatePutCamera: UpdateOfficeDto,
  ): Promise<ReturnOfficeDto> {
    return new ReturnOfficeDto(
      await this.officeService.updatePatchOffice(id, updatePutCamera),
    );
  }

  @Delete(':id')
  async deleteOffice(@Param('id') id: string) {
    return await this.officeService.deleteOffice(id);
  }
}
