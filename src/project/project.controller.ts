import { Body, Controller, Get, Post, Query, UseInterceptors, UploadedFile, Put } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from './schema/project.schema';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import sharp from 'sharp';
import * as fs from 'fs';

import { CreateProjectDto } from './dto/project.dto';
import { CreateTeamProjectDto } from './dto/teamProject.dto';
import { UpdateTodosDto } from './dto/todos.dto';
import { UpdateWorkDto } from './dto/works.dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }
  @Get('list')
  async findByUserId(@Query('userid') userid: string): Promise<Project[] | null> {
    return this.projectService.findByUserId(userid);
  }






  @Post('create')
  async create(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectService.create(createProjectDto);
  }
  @Post('teamcreate')
  async teamcreate(@Body() createTeamProjectDto: CreateTeamProjectDto): Promise<Project> {
    return this.projectService.createTeam(createTeamProjectDto);
  }
  @Post('file')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, file.originalname.replace(/\..+$/, '') + '-' + uniqueSuffix + '.webp'); // WebP로 변경
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const filePath = `./uploads/${file.filename}`;
    const tempPath = `./uploads/temp-${file.filename}`;

    await sharp(file.path)
      .resize({ width: 1200 })
      .webp({ quality: 80 })
      .toFile(tempPath);

    // 원본 삭제
    fs.unlinkSync(file.path);

    // 임시 파일 이름을 최종 이름으로 변경
    fs.renameSync(tempPath, filePath);


    return { filename: file.filename, path: filePath };
  }





  @Put('todos')
  async updateTodos(@Body() updateTodosDto: UpdateTodosDto): Promise<any> {
    const { todos, milestonesProgress } = updateTodosDto;

    for (const todo of todos) {
      await this.projectService.updateTodo(todo._id, {
        completed: todo.completed,
      });
    }

    for (const milestone of milestonesProgress) {
      await this.projectService.updateMilestoneProgress(
        milestone._id,
        milestone.progress,
      );
    }

    return { message: 'Todos and milestones updated successfully' };
  }
  @Put('work')
  async updateWork(@Body() updateWorkDto: UpdateWorkDto): Promise<any> {
    const { work } = updateWorkDto;
    await this.projectService.updateWork(work._id, {
      work: work.work,
      date: work.date,
    });
    return { message: '업데이트 완료' }
  }

}
