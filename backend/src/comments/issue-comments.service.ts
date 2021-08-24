import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/shared/base.service';
import { IssueCommentDto } from './dto/issue-comment.dto';
import { IssueComment } from './models/issue-comment.model';

@Injectable()
export class IssueCommentsService extends BaseService<IssueComment> {
  constructor(
    @InjectModel(IssueComment.name) private readonly commentModel: Model<IssueComment>,
    @InjectMapper() private mapper: Mapper
  ) {
    super();
    this.model = commentModel;
    this.mapper.createMap(IssueComment, IssueCommentDto);
  }

  map(comment: IssueComment) {
    return this.mapper.map(comment, IssueCommentDto, IssueComment);
  }

  mapArray(comments) {
    return this.mapper.mapArray(comments, IssueCommentDto, IssueComment);
  }
}
