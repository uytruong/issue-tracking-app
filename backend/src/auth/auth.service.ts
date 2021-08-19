import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.model';
import { ConfigService } from 'src/shared/config/config.service';
import { Config } from 'src/shared/config/config.enum';
import { UserDto } from 'src/users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne({ username });
    const isMatchPassword = await compare(password, user?.password);
    if (user && isMatchPassword) {
      return this.usersService.map(user.toJSON());
    }
    return null;
  }

  async login(user: UserDto) {
    const payload: JwtPayload = { sub: user.id, name: user.username };
    return {
      access_token: this.jwtService.sign(payload),
      expires_in: this.configService.get(Config.JWT_EXPIRES_IN).toString()
    };
  }
}