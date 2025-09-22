import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    userid: string;

    @Prop()
    password: string;

    @Prop()
    name: string;

    @Prop()
    email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);