import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
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
import { ReturnUserPagination } from './interface/ReturnUserPagination';
import { ReturnPautaDto } from 'src/pauta/dtos/ReturnPauta.dto';
import { ReturnUserPaginationById } from './interface/ReturnUserPaginationById';
import { Environment } from 'src/enums/role.environment';
import { ReturnUserPautaPagination } from './interface/ReturnUserPautaPagination';

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
  async getAllUser(
    @Query() { limit, page, filter },
  ): Promise<ReturnUserPagination> {
    const resultUser = await this.userService.getAllUser(
      parseInt(limit || Environment.LINE_LIMIT),
      parseInt(page || Environment.CURRENT_PAGE),
      filter || '',
    );

    const user = resultUser.data.map((user) => new ReturnUserDto({ ...user }));

    return { ...resultUser, data: user };
  }

  @Roles(UserType.Admin, UserType.UserIntermediary)
  @Roles(UserType.Admin)
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<ReturnUserDto> {
    return new ReturnUserDto(await this.userService.getUserById(id));
  }

  @Roles(UserType.Admin, UserType.UserIntermediary)
  @Roles(UserType.Admin)
  @Get('pagination/:id')
  async getUserPautaCreateById(
    @Param('id') id: string,
    @Body() { page },
  ): Promise<ReturnUserPaginationById> {
    const resultUser = await this.userService.getUserPautaCreateById(
      id,
      parseInt(page || Environment.CURRENT_PAGE),
    );

    const pauta = resultUser.data.pauta.map(
      (pauta) => new ReturnPautaDto(pauta),
    );

    const newUser = {
      ...resultUser,
      data: {
        id: resultUser.data.id,
        name: resultUser.data.name,
        email: resultUser.data.email,
        phone: resultUser.data.phone,
        cpf: resultUser.data.cpf,
        office: resultUser.data.office,
        pauta: pauta,
      },
    } as ReturnUserPaginationById;

    return newUser;
  }

  @Roles(UserType.User, UserType.UserIntermediary, UserType.Admin)
  @Get('climb/pauta')
  async getUserDataByToken(
    @UserId('userId') userId: string,
    @Body() { page },
  ): Promise<ReturnUserPautaPagination> {
    const resultUser = await this.userService.getUserPauta(
      userId,
      parseInt(page || Environment.CURRENT_PAGE),
    );

    const pauta = resultUser.data.pauta.map(
      (pauta) => new ReturnPautaDto(pauta),
    );

    const newUser = {
      ...resultUser,
      data: {
        id: resultUser.data.id,
        name: resultUser.data.name,
        email: resultUser.data.email,
        phone: resultUser.data.phone,
        cpf: resultUser.data.cpf,
        office: resultUser.data.office,
        pauta: pauta,
      },
    } as ReturnUserPautaPagination;

    return newUser;
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
