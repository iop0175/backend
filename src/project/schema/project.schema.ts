import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  start : Date;

  @Prop()
  end : Date;

  @Prop()
  filename:string;

  @Prop()
  path:string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userid: Types.ObjectId;

}

export const ProjectSchema = SchemaFactory.createForClass(Project);
