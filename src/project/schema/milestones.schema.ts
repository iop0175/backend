import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MilestoneDocument = Milestone & Document;

@Schema()
export class Milestone {
  @Prop({ required: true })
  title: string;

  @Prop({ type: Date, required: true })
  start: Date;

  @Prop({ type: Date, required: true })
  end: Date;

  @Prop({ type: Types.ObjectId, ref: 'Project', required: true })
  project: Types.ObjectId;
}

export const MilestoneSchema = SchemaFactory.createForClass(Milestone);
