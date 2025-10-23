import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type WorkDocument = Work & Document;

@Schema()
export class Work {
  @Prop({ required: true })
  userid: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: 0 })
  work: number;

  @Prop()
  date:Date;

  @Prop({ type: Types.ObjectId, ref: 'Milestone', required: true })
  milestone: Types.ObjectId; // 이름도 단수형으로 변경

}

export const WorkSchema = SchemaFactory.createForClass(Work);