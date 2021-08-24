import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ModelDocument } from './base.model';

@Injectable()
export class BaseService<T> {
  protected model: Model<T>;

  async findAll(filter = {}): Promise<ModelDocument<T>[]> {
    return this.model.find(filter).exec();
  }

  async findOne(filter = {}): Promise<ModelDocument<T>> {
    return this.model.findOne(filter).exec();
  }

  async findById(id: string): Promise<ModelDocument<T>> {
    return this.model.findById(id).exec();
  }

  async create(item: T): Promise<ModelDocument<T>> {
    return this.model.create(item);
  }

  async update(id: string, item: T): Promise<ModelDocument<T>> {
    return this.model.findByIdAndUpdate(id, item, { new: true }).exec();
  }

  async delete(id: string): Promise<ModelDocument<T>> {
    return this.model.findByIdAndDelete(id).exec();
  }

  async deleteMany(filter = {}) {
    return await this.model.deleteMany(filter).exec();
  }
}
