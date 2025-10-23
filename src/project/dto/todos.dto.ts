import { Type } from 'class-transformer';
import { ValidateNested, IsNumber, IsString } from 'class-validator';

class TodoDto {
  @IsString()
  _id: string;

  @IsNumber()
  completed: number;
}

class MilestoneProgressDto {
  @IsString()
   _id: string;

  @IsNumber()
  progress: number;
}

export class UpdateTodosDto {
  @ValidateNested({ each: true })
  @Type(() => TodoDto)
  todos: TodoDto[];

  @ValidateNested({ each: true })
  @Type(() => MilestoneProgressDto)
  milestonesProgress: MilestoneProgressDto[];
}
