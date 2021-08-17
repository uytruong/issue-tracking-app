import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AutoMap } from '@automapper/classes';
import { BaseModel, schemaOptions } from 'src/shared/base.model';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema(schemaOptions)
export class Project extends BaseModel {
  @Prop({ required: true })
  @AutoMap()
  category: string;

  @Prop({ required: true })
  @AutoMap()
  key: string;

  @Prop({ required: true })
  @AutoMap()
  name: string;

  @Prop()
  @AutoMap()
  description?: string;

  @Prop()
  @AutoMap()
  avatarUrl?: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
