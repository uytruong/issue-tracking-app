import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.model';
import { ConfigService } from 'src/shared/config/config.service';
import { Config } from 'src/shared/config/config.enum';
import { UserDto } from 'src/users/dto/user.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne({ username });
    if (!user) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }
    const isMatchPassword = await compare(password, user?.password);
    if (!isMatchPassword) {
      throw new HttpException('Incorrect Password', HttpStatus.BAD_REQUEST);
    }
    return this.usersService.map(user.toJSON());
  }

  async login(user: UserDto) {
    const payload: JwtPayload = { sub: user.id, name: user.username };
    const loginResponse: LoginResponseDto = {
      access_token: this.jwtService.sign(payload),
      expires_in: this.configService.get(Config.JWT_EXPIRES_IN).toString(),
      user: user
    };
    return loginResponse;
  }
}
