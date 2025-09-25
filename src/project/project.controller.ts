import { Body, Controller, Get, Post, Query, UseInterceptors,UploadedFile  } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/project.dto';
import { CreateTeamProjectDto } from './dto/teamProject.dto';
import { Project } from './schema/project.schema';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('create')
  async create(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectService.create(createProjectDto);
  }
  @Post('teamcreate')
  async teamcreate(@Body() createTeamProjectDto: CreateTeamProjectDto): Promise<Project> {
    return this.projectService.createTeam(createTeamProjectDto);
  }
  @Get('list')
  async findByUserId(@Query('userid') userid: string): Promise<Project[]|null> {
    return this.projectService.findByUserId(userid);
  }
  @Post('file')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, file.originalname.replace(/\..+$/, '') + '-' + uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    const filePath = `/upload/${file.path}`;
    return { filename: file.filename, path: file.path };
  }
}
