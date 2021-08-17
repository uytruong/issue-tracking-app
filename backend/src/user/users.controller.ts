import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put,
  Query
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { genSalt, hash } from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { map } from 'lodash';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private usersService: UsersService) {}

  @Get()
  async findUsers(@Query('projectId') projectId: string): Promise<UserDto[]> {
    const users = await this.usersService.findMany({ projectIds: projectId });
    if (users.length === 0) {
      throw new HttpException(`Users Not found`, HttpStatus.NOT_FOUND);
    }
    const usersJSON = map(users, (user) => user.toJSON());
    return this.usersService.mapArray(usersJSON);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserDto> {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new HttpException(`${id} Not found`, HttpStatus.NOT_FOUND);
    }
    return this.usersService.map(user.toJSON());
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    const { username, password, fullname, email, projectIds, avatarUrl } = createUserDto;

    let existingUser = null;
    try {
      existingUser = await this.usersService.findOne({ username });
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
    newUser.fullname = fullname;
    newUser.projectIds = projectIds;
    newUser.email = email;
    newUser.avatarUrl = avatarUrl;

    try {
      const newUserRes = await this.usersService.create(newUser);
      return this.usersService.map(newUserRes.toJSON());
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const { username, avatarUrl, projectIds } = updateUserDto;
    if (!id || !updateUserDto) {
      throw new HttpException('Missing parameters', HttpStatus.BAD_REQUEST);
    }

    const exist = await this.usersService.findById(id);

    if (!exist) {
      throw new HttpException(`${id} Not found`, HttpStatus.NOT_FOUND);
    }

    if (username) {
      exist.username = username;
    }

    if (avatarUrl) {
      exist.avatarUrl = avatarUrl;
    }

    if (projectIds) {
      exist.projectIds = projectIds;
    }

    try {
      const updated = await this.usersService.update(id, exist);
      return this.usersService.map(updated.toJSON());
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<UserDto> {
    try {
      const deleted = await this.usersService.delete(id);
      return this.usersService.map(deleted.toJSON());
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
