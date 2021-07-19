import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseModel, schemaOptions } from 'src/shared/base.model';
import { AutoMap } from '@automapper/classes';

export type UserDocument = User & Document;

@Schema(schemaOptions)
export class User extends BaseModel {
  @Prop({ required: true })
  @AutoMap()
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  @AutoMap()
  avatarUrl: string;

  @Prop([String])
  @AutoMap()
  projectId: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
