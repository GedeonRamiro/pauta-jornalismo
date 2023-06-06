import { Body, Controller, Get, Post } from '@nestjs/common';
import { CameraService } from './camera.service';
import { CreateCameraDto } from './dtos/createCamera.dto';
import { CameraEntity } from './entities/camera.entity';
import { ReturnCameraDto } from './dtos/ReturnCamera.dto';

@Controller('camera')
export class CameraController {
  constructor(private readonly cameraService: CameraService) {}

  @Post()
  async createCamera(
    @Body() createCamera: CreateCameraDto,
  ): Promise<CameraEntity> {
    return await this.cameraService.createCamera(createCamera);
  }

  @Get()
  async getAllCamera(): Promise<ReturnCameraDto[]> {
    const cameras = (await this.cameraService.getAllCamera()).map(
      (camera) => new ReturnCameraDto(camera),
    );
    return cameras;
  }
}
