import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from 'src/shared/shared.module';
import { IssueCommentsController } from './issue-comments.controller';
import { IssueCommentsService } from './issue-comments.service';
import { IssueComment, IssueCommentSchema } from './models/issue-comment.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: IssueComment.name, schema: IssueCommentSchema }]),
    SharedModule
  ],
  controllers: [IssueCommentsController],
  providers: [IssueCommentsService]
})
export class IssueCommentsModule {}
