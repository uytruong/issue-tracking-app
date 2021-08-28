import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Put,
  Query,
  UseGuards
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { map } from 'lodash';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { Role } from './models/role.enum';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findUsers(
    @Query('projectId') projectId: string,
    @Query('username') username: string
  ): Promise<UserDto[]> {
    let filter = {};

    if (projectId) {
      filter = { ...filter, projectIds: projectId };
    }

    if (username) {
      const regex = new RegExp(username, 'i');
      filter = { ...filter, username: { $regex: regex } };
    }

    const users = await this.usersService.findAll(filter);
    if (users.length === 0) {
      throw new HttpException(`Users Not found`, HttpStatus.NOT_FOUND);
    }
    const usersJSON = map(users, (user) => user.toJSON());
    return this.usersService.mapArray(usersJSON);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserDto> {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new HttpException(`${id} Not found`, HttpStatus.NOT_FOUND);
    }
    return this.usersService.map(user.toJSON());
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const { username, avatarUrl, projectIds, role } = updateUserDto;
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

    if (role) {
      exist.role = role;
    }

    try {
      const updated = await this.usersService.update(id, exist);
      return this.usersService.map(updated.toJSON());
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
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
