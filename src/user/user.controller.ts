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
import { ReturnUserDto } from './dtos/ReturnUser.dto';
import { Roles } from 'src/decorator/roles.decorator';
import { UserType } from './enums/role.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() createUser: CreateUserDto): Promise<UserEntity> {
    return await this.userService.createUser(createUser);
  }

  @Roles(UserType.User)
  @Get()
  async getAllUser(): Promise<ReturnUserDto[]> {
    const users = (await this.userService.getAlUser()).map(
      (user) => new ReturnUserDto(user),
    );

    return users;
  }

  @Roles(UserType.User)
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<ReturnUserDto> {
    return new ReturnUserDto(await this.userService.getUserById(id));
  }
}
