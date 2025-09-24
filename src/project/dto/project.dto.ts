export class CreateTodoDto {
  title: string;
}

export class CreateMilestoneDto {
  title: string;
  start: Date;
  end: Date;
  todos: string[];
}

export class CreateProjectDto {
  userid: string;
  title: string;
  description: string;
  start: Date;
  end: Date;
  filename:string;
  path:string;
  milestones: CreateMilestoneDto[];
}