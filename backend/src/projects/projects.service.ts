import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectDto } from './dto/project.dto';
import { Project, ProjectDocument } from './models/project.model';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private readonly model: Model<ProjectDocument>,
    @InjectMapper() private mapper: Mapper
  ) {
    this.mapper.createMap(Project, ProjectDto);
  }

  async findAll(filter = {}): Promise<ProjectDocument[]> {
    return await this.model.find(filter).exec();
  }

  async findOne(filter = {}): Promise<ProjectDocument> {
    return await this.model.findOne(filter).exec();
  }

  async findById(id: string): Promise<ProjectDocument> {
    return await this.model.findById(id).exec();
  }

  async create(project: Project): Promise<ProjectDocument> {
    const newProject = new this.model(project);
    return await newProject.save();
  }

  async update(id: string, project: Project): Promise<ProjectDocument> {
    return await this.model.findByIdAndUpdate(id, project, { new: true }).exec();
  }

  async delete(id: string): Promise<ProjectDocument> {
    return await this.model.findByIdAndDelete(id).exec();
  }

  map(project: Project) {
    return this.mapper.map(project, ProjectDto, Project);
  }

  mapArray(projects) {
    return this.mapper.mapArray(projects, ProjectDto, Project);
  }
}
