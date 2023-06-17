import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CameraController } from './camera.controller';
import { CameraService } from './camera.service';
import { CameraEntity } from './entities/camera.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CameraEntity])],
  controllers: [CameraController],
  providers: [CameraService],
  exports: [CameraService],
})
export class CameraModule {}
