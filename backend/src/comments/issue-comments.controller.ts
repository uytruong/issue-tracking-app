import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  Query,
  UseGuards
} from '@nestjs/common';
import { IssueCommentsService } from './issue-comments.service';
import { IssueCommentDto } from './dto/issue-comment.dto';
import { map } from 'lodash';
import { IssueComment } from './models/issue-comment.model';
import { AuthGuard } from '@nestjs/passport';

@Controller('comments')
export class IssueCommentsController {
  private readonly logger = new Logger(IssueCommentsController.name);

  constructor(private commentsService: IssueCommentsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findIssueComments(@Query('issueId') issueId: string): Promise<IssueCommentDto[]> {
    const comments = await this.commentsService.findAll({ issueId });
    const commentsJson = map(comments, (comment) => comment.toJSON());
    return this.commentsService.mapArray(commentsJson);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() commentDto: IssueCommentDto): Promise<IssueCommentDto> {
    const { userId, issueId, content } = commentDto;

    const newIssueComment = new IssueComment();
    newIssueComment.userId = userId;
    newIssueComment.issueId = issueId;
    newIssueComment.content = content;

    try {
      const newIssueCommentRes = await this.commentsService.create(newIssueComment);
      return this.commentsService.map(newIssueCommentRes.toJSON());
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
