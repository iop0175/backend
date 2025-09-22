import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/project.dto';
import { Project } from './schema/project.schema';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('create')
  async create(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectService.create(createProjectDto);
  }

  @Get('list')
  async findByUserId(@Query('userid') userid: string): Promise<Project|null> {
    return this.projectService.findByUserId(userid);
  }
}
