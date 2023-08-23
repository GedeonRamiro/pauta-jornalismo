import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ReturnUserDto } from 'src/user/dtos/ReturnUser.dto';
import { UserService } from 'src/user/users.service';
import { LoginDto } from './dto/LoginDto';
import { LoginPayloadDto } from './dto/LoginPayloadDto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<any> {
    const user = await this.userService
      .findUserByEmail(loginDto.email)
      .catch(() => undefined);

    const password = await this.userService
      .isMatchPassword(loginDto.password)
      .catch(() => undefined);

    if (!user || !password) {
      throw new NotFoundException('Email ou senha inválidos!');
    }

    return {
      accessToken: await this.jwtService.signAsync({
        ...new LoginPayloadDto(user),
      }),
      user: new ReturnUserDto(user),
    };
  }
}
