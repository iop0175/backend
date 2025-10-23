export class CreateTodoDto {
  title: string;
}

export class CreateMilestoneDto {
  title: string;
  start: Date;
  end: Date;
  progress: number;
  todos: string[];
}

export class CreateMateDto{
  userid:string;
  name:string
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