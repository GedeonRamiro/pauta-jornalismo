import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from 'src/decorator/roles.decorator';
import { UserType } from 'src/user/enums/role.enum';
import { CreateOfficeDto } from './dtos/CreateOffice.dto';
import { ReturnOfficeDto } from './dtos/ReturnOffice.dto';
import { UpdateOfficeDto } from './dtos/UpdateOffice.dto';
import { OfficeEntity } from './entities/office.entity';
import { ReturnOfficePagination } from './interface/ReturnOfficePagination';
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
  async getAllOffice(
    @Query() { page, limit, filter },
  ): Promise<ReturnOfficePagination> {
    const resultOffice = await this.officeService.getAllOffice(
      parseInt(limit || 10),
      parseInt(page || 1),
      filter || '',
    );

    const office = resultOffice.data.map(
      (office) => new ReturnOfficeDto({ ...office }),
    );

    return { ...resultOffice, data: office };
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
  async deleteOffice(@Param('id') id: string): Promise<{ message: string }> {
    return await this.officeService.deleteOffice(id);
  }
}
