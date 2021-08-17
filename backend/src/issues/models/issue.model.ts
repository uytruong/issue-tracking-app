import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AutoMap } from '@automapper/classes';
import { schemaOptions } from 'src/shared/base.model';
import { Document, Model } from 'mongoose';

export type IssueDocument = Issue & Document;

@Schema({ ...schemaOptions, _id: false })
export class Issue {
  @AutoMap()
  id: number;

  @Prop()
  _id: number;

  @Prop({ required: true })
  @AutoMap()
  title: string;

  @Prop({ required: true })
  @AutoMap()
  stage: string;

  @Prop()
  @AutoMap()
  type: string;

  @Prop()
  @AutoMap()
  priority: string;

  @Prop()
  @AutoMap()
  listPosition: number;

  @Prop()
  @AutoMap()
  description: string;

  @Prop()
  @AutoMap()
  reporterId: string;

  @Prop([String])
  @AutoMap()
  assigneesId: string[];

  @Prop()
  @AutoMap()
  projectId: string;

  @Prop({ default: Date.now })
  @AutoMap()
  createdAt: Date;

  @Prop()
  @AutoMap()
  updatedAt: Date;
}

export const IssueSchema = SchemaFactory.createForClass(Issue);

export interface IssueModel extends Model<IssueDocument> {
  counterReset(id: string, reference: any, callback: any): void;
}
