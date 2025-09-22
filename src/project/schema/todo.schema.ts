import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TodoDocument = Todo & Document;

@Schema()
export class Todo {
  @Prop({ required: true })
  title: string;

  @Prop({ default: 0 })
  completed: number;

  @Prop({ type: Types.ObjectId, ref: 'Milestone', required: true })
  milestone: Types.ObjectId;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
