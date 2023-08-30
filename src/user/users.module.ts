import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfficeModule } from '../office/office.module';
import { PautaModule } from '../pauta/pauta.module';
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
