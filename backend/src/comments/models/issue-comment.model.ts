import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AutoMap } from '@automapper/classes';
import { BaseModel, schemaOptions } from 'src/shared/base.model';
import { Document } from 'mongoose';

export type IssueCommentDocument = IssueComment & Document;

@Schema(schemaOptions)
export class IssueComment extends BaseModel {
  @Prop({ required: true })
  @AutoMap()
  userId: string;

  @Prop({ required: true })
  @AutoMap()
  issueId: string;

  @Prop({ required: true })
  @AutoMap()
  content: string;
}

export const IssueCommentSchema = SchemaFactory.createForClass(IssueComment);
