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
import { CameraService } from './camera.service';
import { CreateCameraDto } from './dtos/createCamera.dto';
import { CameraEntity } from './entities/camera.entity';
import { ReturnCameraDto } from './dtos/ReturnCamera.dto';
import { UpdateCameraDto } from './dtos/UpdateCamera.dto';
import { UserType } from '../user/enums/role.enum';
import { Roles } from '../decorator/roles.decorator';
import { ReturnCameraPagination } from './interface/ReturnCameraPagination';
import { Environment } from '../enums/role.environment';

@Roles(UserType.Admin)
@Controller('camera')
export class CameraController {
  constructor(private readonly cameraService: CameraService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createCamera(
    @Body() createCamera: CreateCameraDto,
  ): Promise<CameraEntity> {
    return await this.cameraService.createCamera(createCamera);
  }

  @Roles(UserType.Admin, UserType.UserIntermediary)
  @Get()
  async getAllCamera(
    @Query() { limit, page, filter },
  ): Promise<ReturnCameraPagination> {
    const resultCamera = await this.cameraService.getAllCamera(
      parseInt(limit || Environment.LINE_LIMIT),
      parseInt(page || Environment.CURRENT_PAGE),
      filter || '',
    );

    const camera = resultCamera.data.map(
      (camera) => new ReturnCameraDto({ ...camera }),
    );

    return { ...resultCamera, data: camera };
  }

  @Roles(UserType.Admin, UserType.UserIntermediary)
  @Get(':id')
  async getCameraById(@Param('id') id: string): Promise<ReturnCameraDto> {
    return new ReturnCameraDto(await this.cameraService.getCameraById(id));
  }

  @UsePipes(ValidationPipe)
  @Patch(':id')
  async updatePatchCamera(
    @Param('id') id: string,
    @Body() updatePutCamera: UpdateCameraDto,
  ): Promise<ReturnCameraDto> {
    return new ReturnCameraDto(
      await this.cameraService.updatePatchCamera(id, updatePutCamera),
    );
  }

  @Delete(':id')
  async deleteCamera(@Param('id') id: string): Promise<{ message: string }> {
    return await this.cameraService.deleteCamera(id);
  }
}
