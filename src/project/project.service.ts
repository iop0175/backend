import { Injectable } from '@nestjs/common';
import { Project, ProjectDocument } from './schema/project.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProjectDto } from './dto/project.dto';

@Injectable()
export class ProjectService {
  constructor(@InjectModel(Project.name) private userModel: Model<ProjectDocument>) { }

  async findByUserId(userid: string): Promise<Project | null> {
    const project = this.userModel.findOne({ userid }).exec();
    return project;
  }
  async create(createProjectDto?: CreateProjectDto) {
    const createdUser = new this.userModel(createProjectDto);
    return createdUser.save();
  }
}
