import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put,
  Query
} from '@nestjs/common';
import { IssueDto } from './dto/issue.dto';
import { IssuesService } from './issues.service';
import { Issue } from './models/issue.model';
import { map } from 'lodash';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { CreateIssueDto } from './dto/create-issue.dto';

@Controller('issues')
export class IssuesController {
  private readonly logger = new Logger(IssuesController.name);

  constructor(private issuesService: IssuesService) {}

  @Get()
  async findIssues(@Query('projectId') projectId: string): Promise<IssueDto[]> {
    const issues = await this.issuesService.findAll({ projectId });
    if (issues.length === 0) {
      throw new HttpException(`Issues Not found`, HttpStatus.NOT_FOUND);
    }
    const issuesJson = map(issues, (issue) => issue.toJSON());
    return this.issuesService.mapArray(issuesJson);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateIssueDto: UpdateIssueDto): Promise<IssueDto> {
    const { title, stage, type, priority, listPosition, description, reporterId, assigneesId } =
      updateIssueDto;

    if (!id || !updateIssueDto) {
      throw new HttpException('Missing parameters', HttpStatus.BAD_REQUEST);
    }

    const exist = await this.issuesService.findById(id);

    if (!exist) {
      throw new HttpException(`Issue with id ${id} Not found`, HttpStatus.NOT_FOUND);
    }

    if (title) {
      exist.title = title;
    }
    if (stage) {
      exist.stage = stage;
    }
    if (type) {
      exist.type = type;
    }
    if (priority) {
      exist.priority = priority;
    }
    if (listPosition) {
      exist.listPosition = listPosition;
    }
    if (description) {
      exist.description = description;
    }
    if (reporterId) {
      exist.reporterId = reporterId;
    }
    if (assigneesId) {
      exist.assigneesId = assigneesId;
    }

    try {
      const updated = await this.issuesService.update(id, exist);
      return this.issuesService.map(updated.toJSON());
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async create(@Body() createIssueDto: CreateIssueDto): Promise<IssueDto> {
    const { title, stage, type, priority, description, reporterId, assigneesId, projectId } =
      createIssueDto;

    let existingIssue = null;
    try {
      existingIssue = await this.issuesService.findOne({ title });
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    if (existingIssue) {
      throw new HttpException(`Issue with title ${title} exists`, HttpStatus.BAD_REQUEST);
    }

    const newIssue = new Issue();
    newIssue.title = title;
    newIssue.stage = stage;
    newIssue.type = type;
    newIssue.priority = priority;
    newIssue.description = description;
    newIssue.reporterId = reporterId;
    newIssue.assigneesId = assigneesId;
    newIssue.projectId = projectId;

    let filteredStageIssues = [];
    try {
      filteredStageIssues = await this.issuesService.findAll({ projectId, stage });
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    newIssue.listPosition = filteredStageIssues.length + 1;

    this.logger.debug(`new issue: ${JSON.stringify(newIssue)}`);
    try {
      const newIssueRes = await this.issuesService.create(newIssue);
      return this.issuesService.map(newIssueRes.toJSON());
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<IssueDto> {
    try {
      const deleted = await this.issuesService.delete(id);
      return this.issuesService.map(deleted.toJSON());
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
