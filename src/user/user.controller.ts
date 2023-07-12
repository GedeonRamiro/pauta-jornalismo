import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UserService } from './users.service';
import { ReturnUserDto } from './dtos/ReturnUser.dto';
import { Roles } from 'src/decorator/roles.decorator';
import { UserType } from './enums/role.enum';
import { UpdateUserDto } from './dtos/UpdateUser.dto';
import { UserId } from 'src/decorator/user-id.decorator';

//@Roles(UserType.User, UserType.UserIntermediary, UserType.Admin)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() createUser: CreateUserDto): Promise<UserEntity> {
    return await this.userService.createUser(createUser);
  }

  @Roles(UserType.Admin, UserType.UserIntermediary)
  @Get()
  async getAllUser(): Promise<ReturnUserDto[]> {
    const users = (await this.userService.getAlUser()).map(
      (user) => new ReturnUserDto(user),
    );

    return users;
  }

  @Roles(UserType.Admin, UserType.UserIntermediary)
  @Roles(UserType.Admin)
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<ReturnUserDto> {
    return new ReturnUserDto(await this.userService.getUserById(id));
  }

  @Roles(UserType.User, UserType.UserIntermediary, UserType.Admin)
  @Get('climb/pauta')
  async getUserDataByToken(@UserId('userId') userId: string): Promise<any> {
    return new ReturnUserDto(await this.userService.getUserPauta(userId));
  }

  @Roles(UserType.Admin)
  @UsePipes(ValidationPipe)
  @Put(':id')
  async updatePutUser(
    @Param('id') id: string,
    @Body() updatePutUser: UpdateUserDto,
  ): Promise<ReturnUserDto> {
    return new ReturnUserDto(
      await this.userService.updatePutUser(id, updatePutUser),
    );
  }

  @Roles(UserType.Admin)
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<{ message: string }> {
    return await this.userService.deleteUser(id);
  }
}
