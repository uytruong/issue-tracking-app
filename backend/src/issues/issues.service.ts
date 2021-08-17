import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IssueDto } from './dto/issue.dto';
import { Issue, IssueDocument, IssueModel } from './models/issue.model';

@Injectable()
export class IssuesService {
  private readonly logger = new Logger(IssuesService.name);

  constructor(
    @InjectModel(Issue.name) private readonly model: IssueModel,
    @InjectMapper() private mapper: Mapper
  ) {
    this.mapper.createMap(Issue, IssueDto);
  }

  async findAll(filter = {}): Promise<IssueDocument[]> {
    return await this.model.find(filter).exec();
  }

  async findOne(filter = {}): Promise<IssueDocument> {
    return await this.model.findOne(filter).exec();
  }

  async findById(id: string): Promise<IssueDocument> {
    return await this.model.findById(id).exec();
  }

  async create(Issue: Issue): Promise<IssueDocument> {
    const newProject = new this.model(Issue);
    return await newProject.save();
  }

  async update(id: string, Issue: Issue): Promise<IssueDocument> {
    return await this.model.findByIdAndUpdate(id, Issue, { new: true }).exec();
  }

  async delete(id: string): Promise<IssueDocument> {
    return await this.model.findByIdAndDelete(id).exec();
  }

  map(issue: Issue) {
    return this.mapper.map(issue, IssueDto, Issue);
  }

  mapArray(issues) {
    return this.mapper.mapArray(issues, IssueDto, Issue);
  }

  resetCounter() {
    this.model.counterReset('id', {}, function (err) {
      this.logger.error(err);
    });
  }
}
