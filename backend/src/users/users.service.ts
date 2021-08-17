import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './models/user.model';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
    @InjectMapper() private mapper: Mapper
  ) {
    this.mapper.createMap(User, UserDto);
  }

  async findAll(): Promise<UserDocument[]> {
    return await this.model.find().exec();
  }

  async findOne(filter = {}): Promise<UserDocument> {
    return await this.model.findOne(filter).exec();
  }

  async findMany(filter = {}): Promise<UserDocument[]> {
    return await this.model.find(filter).exec();
  }

  async findById(id: string): Promise<UserDocument> {
    return await this.model.findById(id).exec();
  }

  async create(user: User): Promise<UserDocument> {
    const newUser = new this.model(user);
    return await newUser.save();
  }

  async update(id: string, user: User): Promise<UserDocument> {
    return await this.model.findByIdAndUpdate(id, user, { new: true }).exec();
  }

  async delete(id: string): Promise<UserDocument> {
    return await this.model.findByIdAndDelete(id).exec();
  }

  map(user: User) {
    return this.mapper.map(user, UserDto, User);
  }

  mapArray(users) {
    return this.mapper.mapArray(users, UserDto, User);
  }
}
