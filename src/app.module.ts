import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './user/users.module';
import { CameraModule } from './camera/camera.module';
import { VehicleModule } from './vehiche/vehicle.module';
import { AuthModule } from './auth/auth.module';
import { PautaModule } from './pauta/pauta.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DB_DATABASE,
      entities: [`${__dirname}/**/*.entity{.js,.ts}`],
    }),
    UsersModule,
    CameraModule,
    VehicleModule,
    AuthModule,
    PautaModule,
  ],

  providers: [],
})
export class AppModule {}
