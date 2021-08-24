import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/shared/base.service';
import { ProjectDto } from './dto/project.dto';
import { Project } from './models/project.model';

@Injectable()
export class ProjectsService extends BaseService<Project> {
  constructor(
    @InjectModel(Project.name) private readonly projectModel: Model<Project>,
    @InjectMapper() private mapper: Mapper
  ) {
    super();
    this.model = projectModel;
    this.mapper.createMap(Project, ProjectDto);
  }

  map(project: Project) {
    return this.mapper.map(project, ProjectDto, Project);
  }

  mapArray(projects) {
    return this.mapper.mapArray(projects, ProjectDto, Project);
  }
}
