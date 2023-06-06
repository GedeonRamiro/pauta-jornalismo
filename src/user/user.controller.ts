import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dtos/CreateUser.dto';

import { UserService } from './users.service';
import { ReturnuserDto } from './dtos/ReturnUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() createUser: CreateUserDto): Promise<UserEntity> {
    return await this.userService.createUser(createUser);
  }

  @Get()
  async getAllUser(): Promise<ReturnuserDto[]> {
    const users = (await this.userService.getAlUser()).map(
      (user) => new ReturnuserDto(user),
    );

    return users;
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<ReturnuserDto> {
    return new ReturnuserDto(await this.userService.getUserById(id));
  }
}
