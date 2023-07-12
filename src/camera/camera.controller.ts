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
import { CameraService } from './camera.service';
import { CreateCameraDto } from './dtos/createCamera.dto';
import { CameraEntity } from './entities/camera.entity';
import { ReturnCameraDto } from './dtos/ReturnCamera.dto';
import { UpdateCameraDto } from './dtos/UpdateCamera.dto';
import { UserType } from 'src/user/enums/role.enum';
import { Roles } from 'src/decorator/roles.decorator';

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
  async getAllCamera(): Promise<ReturnCameraDto[]> {
    const cameras = (await this.cameraService.getAllCamera()).map(
      (camera) => new ReturnCameraDto(camera),
    );
    return cameras;
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
