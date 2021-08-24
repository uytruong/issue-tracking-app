import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './models/user.model';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { UserDto } from './dto/user.dto';
import { BaseService } from 'src/shared/base.service';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectMapper() private mapper: Mapper
  ) {
    super();
    this.model = userModel;
    this.mapper.createMap(User, UserDto);
  }

  map(user: User) {
    return this.mapper.map(user, UserDto, User);
  }

  mapArray(users) {
    return this.mapper.mapArray(users, UserDto, User);
  }
}
