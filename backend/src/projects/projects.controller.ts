import {
  Body,
  Controller,
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

@Controller('projects')
export class ProjectsController {
  private readonly logger = new Logger(ProjectsController.name);

  constructor(private projectsService: ProjectsService) {}

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
  async create(@Body() projectDto: ProjectDto): Promise<ProjectDto> {
    const { category, key, name, description, avatarUrl } = projectDto;

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
      const newProjRes = await this.projectsService.create(newProject);
      return this.projectsService.map(newProjRes.toJSON());
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
}
