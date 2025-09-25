export class CreateTodoDto {
  title: string;
}

export class CreateMilestoneDto {
  title: string;
  start: Date;
  end: Date;
  todos: string[];
}

export class CreateMateDto{
  [x: string]: any;
  userid:string;
  name:string
}

export class CreateTeamProjectDto {
  userid: string;
  title: string;
  description: string;
  start: Date;
  end: Date;
  filename:string;
  path:string;
  milestones: CreateMilestoneDto[];
  mate: CreateMateDto[];
}