import { Module } from '@nestjs/common';
import { PautaController } from './pauta.controller';
import { PautaService } from './pauta.service';

@Module({
  controllers: [PautaController],
  providers: [PautaService]
})
export class PautaModule {}
