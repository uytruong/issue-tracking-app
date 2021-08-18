import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IssueCommentsController } from './issue-comments.controller';
import { IssueCommentsService } from './issue-comments.service';
import { IssueComment, IssueCommentSchema } from './models/issue-comment.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: IssueComment.name, schema: IssueCommentSchema }])],
  controllers: [IssueCommentsController],
  providers: [IssueCommentsService]
})
export class IssueCommentsModule {}
