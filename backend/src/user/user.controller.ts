import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.model';
import { UserService } from './user.service';
import { genSalt, hash } from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { map } from 'lodash';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async findAll(): Promise<UserDto[]> {
    const users = await this.userService.findAll();
    const usersJSON = map(users, (user) => user.toJSON());
    return this.userService.mapArray(usersJSON);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserDto> {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new HttpException(`${id} Not found`, HttpStatus.NOT_FOUND);
    }
    return this.userService.map(user.toJSON());
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const { username, password } = createUserDto;

    if (!username) {
      throw new HttpException('Username is required', HttpStatus.BAD_REQUEST);
    }

    if (!password) {
      throw new HttpException('Password is required', HttpStatus.BAD_REQUEST);
    }

    let existingUser = null;
    try {
      existingUser = await this.userService.findOne({ username });
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    if (existingUser) {
      throw new HttpException(`${username} exists`, HttpStatus.BAD_REQUEST);
    }

    const newUser = new User();
    newUser.username = username;
    const salt = await genSalt(10);
    newUser.password = await hash(password, salt);

    try {
      const result = await this.userService.create(newUser);
      return result;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const { username, avatarUrl } = updateUserDto;
    if (!id || !updateUserDto) {
      throw new HttpException('Missing parameters', HttpStatus.BAD_REQUEST);
    }

    const exist = await this.userService.findById(id);

    if (!exist) {
      throw new HttpException(`${id} Not found`, HttpStatus.NOT_FOUND);
    }

    if (username) {
      exist.username = username;
    }

    if (avatarUrl) {
      exist.avatarUrl = avatarUrl;
    }

    try {
      const updated = await this.userService.update(id, exist);
      return this.userService.map(updated.toJSON());
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<UserDto> {
    try {
      const deleted = await this.userService.delete(id);
      return this.userService.map(deleted.toJSON());
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
