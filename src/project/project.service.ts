import { Injectable, BadRequestException } from '@nestjs/common';
import { Project, ProjectDocument } from './schema/project.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { CreateProjectDto } from './dto/project.dto';
import { CreateTeamProjectDto } from './dto/teamProject.dto';
import { Milestone, MilestoneDocument } from './schema/milestones.schema';
import { Todo, TodoDocument } from './schema/todo.schema';
import { InjectConnection } from '@nestjs/mongoose';
import { Mate, MateDocument } from './schema/mate.schema';
import { Work, WorkDocument } from './schema/work.schema';
@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    @InjectModel(Milestone.name) private milestoneModel: Model<MilestoneDocument>,
    @InjectModel(Todo.name) private todoModel: Model<TodoDocument>,
    @InjectModel(Mate.name) private mateModel: Model<MateDocument>,
    @InjectModel(Work.name) private workModel: Model<WorkDocument>,
    @InjectConnection() private readonly connection: Connection
  ) { }

  async findByUserId(userid: string): Promise<any[]> {
    const projects = await this.projectModel.find({ userid }).lean().exec();
    const teamProject = await this.mateModel.find({ userid }, { project: 1, _id: 0 }).lean().exec();
    const teamProjectIds = teamProject.map(mate => mate.project);
    const teamProjects = await this.projectModel.find({ _id: { $in: teamProjectIds } }).lean().exec();
    const projectMap = new Map<string, any>();
    [...projects, ...teamProjects].forEach(p => {
      projectMap.set(p._id.toString(), p);
    });
    const uniqueProjects = Array.from(projectMap.values());

    if (!projects || projects.length === 0) return [];
    const projectsWithMilestones = await Promise.all(
      uniqueProjects.map(async (project) => {
        const milestones = await this.milestoneModel.find({ project: project._id }).lean().exec();
        const mate = await this.mateModel.find({ project: project._id }).lean().exec();
        const milestoneIds = milestones.map(m => m._id);
        const todos = await this.todoModel.find({ milestone: { $in: milestoneIds } }).lean().exec();
        const works = await this.workModel.find({ milestone: { $in: milestoneIds } }).lean().exec();
        return { ...project, milestones, mate, todos, works };
      })
    );

    return projectsWithMilestones;
  }


  async create(dto: CreateProjectDto) {
    if (!dto) {
      throw new BadRequestException('요청 데이터가 비어 있습니다.');
    }

    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const project = new this.projectModel({
        title: dto.title,
        description: dto.description,
        userid: dto.userid,
        start: dto.start,
        end: dto.end,
        filename: dto.filename,
        path: dto.path
      });
      await project.save({ session });

      for (const milestoneDto of dto.milestones ?? []) {
        const milestone = new this.milestoneModel({
          title: milestoneDto.title,
          start: milestoneDto.start,
          end: milestoneDto.end,
          project: project._id
        });
        await milestone.save({ session });

        for (const todoTitle of milestoneDto.todos ?? []) {
          const todo = new this.todoModel({
            title: todoTitle,
            milestone: milestone._id
          });
          await todo.save({ session });
        }
      }

      // 트랜잭션 커밋
      await session.commitTransaction();
      return project;
    } catch (err) {
      // 오류 발생 시 롤백
      await session.abortTransaction();
      throw err;
    } finally {
      session.endSession();
    }
  }
  async createTeam(dto: CreateTeamProjectDto) {
    if (!dto) {
      throw new BadRequestException('요청 데이터가 비어 있습니다.');
    }

    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const project = new this.projectModel({
        title: dto.title,
        description: dto.description,
        userid: dto.userid,
        start: dto.start,
        end: dto.end,
        filename: dto.filename,
        path: dto.path
      });
      await project.save({ session });
      for (const mateDto of dto.mate ?? []) {
        const mate = new this.mateModel({
          userid: mateDto.userid,
          name: mateDto.name,
          project: project._id
        });
        await mate.save({ session })
      }
      for (const milestoneDto of dto.milestones ?? []) {
        const milestone = new this.milestoneModel({
          title: milestoneDto.title,
          start: milestoneDto.start,
          end: milestoneDto.end,
          project: project._id
        });
        await milestone.save({ session });

        for (const todoTitle of milestoneDto.todos ?? []) {
          const todo = new this.todoModel({
            title: todoTitle,
            milestone: milestone._id
          });
          await todo.save({ session });
        }
        for (const mateDto of dto.mate ?? []) {
          const work = new this.workModel({
            userid: mateDto.userid,
            name: mateDto.name,
            work: 0,
            date: new Date(),
            milestone: milestone._id,
          });
          await work.save({ session });

        }
      }

      // 트랜잭션 커밋
      await session.commitTransaction();
      return project;
    } catch (err) {
      // 오류 발생 시 롤백
      await session.abortTransaction();
      throw err;
    } finally {
      session.endSession();
    }
  }
  async updateTodo(id: string, updateData: any) {
    return this.todoModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  async updateMilestoneProgress(milestoneId: string, progress: number) {
    return this.milestoneModel.findByIdAndUpdate(
      milestoneId,
      { progress },
      { new: true },
    );
  }

  async updateWork(id: string, updateData: any) {
    await this.workModel.findByIdAndUpdate(id, updateData);
  }
}
