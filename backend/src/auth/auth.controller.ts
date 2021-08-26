import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { Role } from 'src/users/models/role.enum';
import { UserDto } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/models/user.model';
import { genSalt, hash } from 'bcrypt';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService, private usersService: UsersService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<UserDto> {
    const { username, password, fullname, email } = registerDto;

    let existingUser = null;
    try {
      existingUser = await this.usersService.findOne({ username });
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    if (existingUser) {
      throw new HttpException(`${username} exists`, HttpStatus.BAD_REQUEST);
    }
    const isPasswordValid = this.authService.validatePassword(password);
    if (!isPasswordValid) {
      throw new HttpException(`Password is invalid`, HttpStatus.BAD_REQUEST);
    }

    const newUser = new User();
    newUser.username = username;
    const salt = await genSalt(10);
    newUser.password = await hash(password, salt);
    newUser.fullname = fullname;
    newUser.email = email;

    try {
      const newUserRes = await this.usersService.create(newUser);
      return this.usersService.map(newUserRes.toJSON());
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @Get('test')
  async test(@Request() req) {
    return req.user;
  }
}
