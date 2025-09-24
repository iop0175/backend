import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { Project, ProjectSchema } from './schema/project.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Milestone, MilestoneSchema } from './schema/milestones.schema';
import { Todo, TodoSchema } from './schema/todo.schema';

@Module({
  imports :[MongooseModule.forFeature([ { name: Project.name, schema: ProjectSchema },
      { name: Milestone.name, schema: MilestoneSchema },
      { name: Todo.name, schema: TodoSchema },])],
  providers: [ProjectService],
  controllers: [ProjectController]
})
export class ProjectModule {}
