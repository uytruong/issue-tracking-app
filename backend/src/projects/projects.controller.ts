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
import { ProjectDto } from './dto/project.dto';
import { ProjectsService } from './projects.service';
import { map } from 'lodash';
import { Project } from './models/project.model';
import { UpdateProjectDto } from './dto/update-project.dto';
import { UsersService } from 'src/users/users.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { CreateProjectResponseDto } from './dto/create-project-response.dto';
import { IssuesService } from 'src/issues/issues.service';

@Controller('projects')
export class ProjectsController {
  private readonly logger = new Logger(ProjectsController.name);

  constructor(
    private projectsService: ProjectsService,
    private usersService: UsersService,
    private issuesService: IssuesService
  ) {}

  @Get()
  async findProjects(
    @Query('ids') encodedIds?: string,
    @Query('key') key?: string
  ): Promise<ProjectDto[]> {
    const filter = {};

    if (encodedIds) {
      const ids = JSON.parse(decodeURIComponent(encodedIds));
      filter['_id'] = { $in: ids };
    }

    if (key) {
      filter['key'] = key;
    }

    const projects = await this.projectsService.findAll(filter);
    if (projects.length === 0) {
      throw new HttpException(`Projects Not found`, HttpStatus.NOT_FOUND);
    }
    const projectsJSON = map(projects, (project) => project.toJSON());
    return this.projectsService.mapArray(projectsJSON);
  }

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto): Promise<CreateProjectResponseDto> {
    const { userId, category, key, name, description, avatarUrl } = createProjectDto;
    let user = null;
    try {
      user = await this.usersService.findById(userId);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    if (!user) {
      throw new HttpException(`User Not Found`, HttpStatus.NOT_FOUND);
    }

    let existingProject = null;
    try {
      existingProject = await this.projectsService.findOne({ key });
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    if (existingProject) {
      throw new HttpException(`Project with key ${key} exists`, HttpStatus.BAD_REQUEST);
    }

    const newProject = new Project();
    newProject.category = category;
    newProject.key = key;
    newProject.name = name;
    newProject.description = description;
    newProject.avatarUrl = avatarUrl;

    try {
      const newProjResult = await this.projectsService.create(newProject);
      const newProjectResponse = this.projectsService.map(newProjResult.toJSON());

      user.projectIds.push(newProjectResponse.id);
      const updatedUser = await this.usersService.update(user.id, user);
      const userResponse = await this.usersService.map(updatedUser.toJSON());

      return { project: newProjectResponse, user: userResponse };
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto
  ): Promise<ProjectDto> {
    const { category, name, description, avatarUrl } = updateProjectDto;

    if (!id || !updateProjectDto) {
      throw new HttpException('Missing parameters', HttpStatus.BAD_REQUEST);
    }

    const exist = await this.projectsService.findById(id);

    if (!exist) {
      throw new HttpException(`${id} Not found`, HttpStatus.NOT_FOUND);
    }

    if (category) {
      exist.category = category;
    }

    if (name) {
      exist.name = name;
    }

    if (description) {
      exist.description = description;
    }

    if (avatarUrl) {
      exist.avatarUrl = avatarUrl;
    }

    try {
      const updated = await this.projectsService.update(id, exist);
      return this.projectsService.map(updated.toJSON());
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Query('userId') userId: string
  ): Promise<CreateProjectResponseDto> {
    try {
      const deleted = await this.projectsService.delete(id);

      const projectUsers = await this.usersService.findAll({ projectIds: id });
      this.logger.debug(`projectUsers: ${JSON.stringify(projectUsers)}`);
      projectUsers.forEach((user) => {
        user.projectIds = user.projectIds.filter((projectId) => projectId !== id);
        this.usersService.update(user.id, user);
      });

      const existingUser = await this.usersService.findById(userId);
      if (!existingUser) {
        throw new HttpException(`User Not Found`, HttpStatus.NOT_FOUND);
      }

      const deleteIssueResult = await this.issuesService.deleteMany({ projectId: id });
      this.logger.debug(`deleteIssueResult: ${JSON.stringify(deleteIssueResult)}`);

      const deletedProjectResponse = this.projectsService.map(deleted.toJSON());
      const userResponse = this.usersService.map(existingUser.toJSON());

      return { project: deletedProjectResponse, user: userResponse };
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
