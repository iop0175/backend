import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MateDocument = Mate & Document;

@Schema()
export class Mate {
  @Prop({ required: true })
  userid: string;

  @Prop()
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'Project', required: true })
  project: Types.ObjectId;
}

export const MateSchema = SchemaFactory.createForClass(Mate);