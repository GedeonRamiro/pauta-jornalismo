import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PautaEntity } from './entities/pauta.entity';
import { PautaController } from './pauta.controller';
import { PautaService } from './pauta.service';

@Module({
  imports: [TypeOrmModule.forFeature([PautaEntity])],
  controllers: [PautaController],
  providers: [PautaService],
})
export class PautaModule {}
