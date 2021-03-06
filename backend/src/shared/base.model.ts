import { Prop, SchemaOptions } from '@nestjs/mongoose';
import { AutoMap } from '@automapper/classes';
import { Document } from 'mongoose';

export declare type ModelDocument<T> = T & Document;
export abstract class BaseModel {
  @Prop({ required: true })
  @AutoMap()
  id: string;

  @Prop({ default: Date.now })
  @AutoMap()
  createdAt: Date;

  @Prop()
  @AutoMap()
  updatedAt: Date;
}

export const schemaOptions: SchemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true
  }
};
