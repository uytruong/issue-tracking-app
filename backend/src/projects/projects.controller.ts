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
  Query,
  Request,
  UseGuards
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
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { Role } from 'src/users/models/role.enum';

@Controller('projects')
export class ProjectsController {
  private readonly logger = new Logger(ProjectsController.name);

  constructor(
    private projectsService: ProjectsService,
    private usersService: UsersService,
    private issuesService: IssuesService
  ) {}

  @UseGuards(AuthGuard('jwt'))
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

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @Post()
  async create(
    @Request() req,
    @Body() createProjectDto: CreateProjectDto
  ): Promise<CreateProjectResponseDto> {
    const { userIds, category, key, name, description, avatarUrl } = createProjectDto;

    const creator = req.user;
    userIds.push(creator.userId);
    let users = null;
    try {
      users = await this.usersService.findAll({ _id: { $in: userIds } });
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
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

      let creatorResponse;
      for (const user of users) {
        user.projectIds.push(newProjectResponse.id);
        const updatedCreator = await this.usersService.update(user.id, user);
        if (user.id === creator.userId) {
          creatorResponse = this.usersService.map(updatedCreator.toJSON());
        }
      }

      return { project: newProjectResponse, user: creatorResponse };
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
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

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  async delete(@Param('id') id: string, @Request() req): Promise<CreateProjectResponseDto> {
    const creator = req.user;
    try {
      const deleted = await this.projectsService.delete(id);

      const projectUsers = await this.usersService.findAll({ projectIds: id });
      this.logger.debug(`projectUsers: ${JSON.stringify(projectUsers)}`);
      projectUsers.forEach((user) => {
        user.projectIds = user.projectIds.filter((projectId) => projectId !== id);
        this.usersService.update(user.id, user);
      });

      const existingUser = await this.usersService.findById(creator.userId);
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
