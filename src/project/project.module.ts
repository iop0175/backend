import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { Project, ProjectSchema } from './schema/project.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Milestone, MilestoneSchema } from './schema/milestones.schema';
import { Todo, TodoSchema } from './schema/todo.schema';
import { Mate, MateSchema } from './schema/mate.schema'
import { Work, WorkSchema } from './schema/work.schema';
@Module({
  imports: [MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema },
  { name: Milestone.name, schema: MilestoneSchema },
  { name: Todo.name, schema: TodoSchema },
  { name: Mate.name, schema: MateSchema },
  { name: Work.name, schema: WorkSchema }
  ])],
  providers: [ProjectService],
  controllers: [ProjectController]
})
export class ProjectModule { }
