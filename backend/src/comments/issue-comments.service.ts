import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IssueCommentDto } from './dto/issue-comment.dto';
import { IssueComment, IssueCommentDocument } from './models/issue-comment.model';

@Injectable()
export class IssueCommentsService {
  constructor(
    @InjectModel(IssueComment.name) private readonly model: Model<IssueCommentDocument>,
    @InjectMapper() private mapper: Mapper
  ) {
    this.mapper.createMap(IssueComment, IssueCommentDto);
  }

  async findAll(filter = {}): Promise<IssueCommentDocument[]> {
    return await this.model.find(filter).exec();
  }

  async findOne(filter = {}): Promise<IssueCommentDocument> {
    return await this.model.findOne(filter).exec();
  }

  async findById(id: string): Promise<IssueCommentDocument> {
    return await this.model.findById(id).exec();
  }

  async create(comment: IssueComment): Promise<IssueCommentDocument> {
    const newIssueComment = new this.model(comment);
    return await newIssueComment.save();
  }

  async update(id: string, comment: IssueComment): Promise<IssueCommentDocument> {
    return await this.model.findByIdAndUpdate(id, comment, { new: true }).exec();
  }

  async delete(id: string): Promise<IssueCommentDocument> {
    return await this.model.findByIdAndDelete(id).exec();
  }

  map(comment: IssueComment) {
    return this.mapper.map(comment, IssueCommentDto, IssueComment);
  }

  mapArray(comments) {
    return this.mapper.mapArray(comments, IssueCommentDto, IssueComment);
  }
}
