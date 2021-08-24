import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/shared/base.service';
import { IssueDto } from './dto/issue.dto';
import { Issue } from './models/issue.model';

@Injectable()
export class IssuesService extends BaseService<Issue> {
  private readonly logger = new Logger(IssuesService.name);

  constructor(
    @InjectModel(Issue.name) private readonly issueModel: Model<Issue>,
    @InjectMapper() private mapper: Mapper
  ) {
    super();
    this.model = issueModel;
    this.mapper.createMap(Issue, IssueDto);
  }

  map(issue: Issue) {
    return this.mapper.map(issue, IssueDto, Issue);
  }

  mapArray(issues) {
    return this.mapper.mapArray(issues, IssueDto, Issue);
  }
}
