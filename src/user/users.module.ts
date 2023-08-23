import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfficeModule } from 'src/office/office.module';
import { PautaModule } from 'src/pauta/pauta.module';
import { UserEntity } from './entities/user.entity';

import { UserController } from './user.controller';
import { UserService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => PautaModule),
    OfficeModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
