import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CameraModule } from 'src/camera/camera.module';
import { UsersModule } from 'src/user/users.module';
import { VehicleModule } from 'src/vehiche/vehicle.module';
import { PautaEntity } from './entities/pauta.entity';
import { PautaController } from './pauta.controller';
import { PautaService } from './pauta.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PautaEntity]),
    forwardRef(() => UsersModule),
    CameraModule,
    VehicleModule,
  ],
  controllers: [PautaController],
  providers: [PautaService],
  exports: [PautaService],
})
export class PautaModule {}
