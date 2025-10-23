export class CreateTodoDto {
  title: string;
}

export class CreateMilestoneDto {
  title: string;
  start: Date;
  end: Date;
  progress: number;
  todos: string[];
  work: CreateWorkDto[];
}

export class CreateMateDto {
  [x: string]: any;
  userid: string;
  name: string
}

export class CreateWorkDto {
  userid: string;
  work: number;
}

export class CreateTeamProjectDto {
  userid: string;
  title: string;
  description: string;
  start: Date;
  end: Date;
  filename: string;
  path: string;
  milestones: CreateMilestoneDto[];
  mate: CreateMateDto[];
}