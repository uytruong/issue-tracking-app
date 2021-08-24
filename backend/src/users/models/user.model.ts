import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseModel, schemaOptions } from 'src/shared/base.model';
import { AutoMap } from '@automapper/classes';
import { Role } from './role.enum';

export type UserDocument = User & Document;

@Schema(schemaOptions)
export class User extends BaseModel {
  @Prop({ required: true })
  @AutoMap()
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  @AutoMap()
  fullname: string;

  @Prop()
  @AutoMap()
  email: string;

  @Prop()
  @AutoMap()
  avatarUrl: string;

  @Prop([String])
  @AutoMap()
  projectIds: string[];

  @Prop({ type: String, enum: [Role.Admin, Role.User], default: Role.User })
  @AutoMap({ typeFn: () => String })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
