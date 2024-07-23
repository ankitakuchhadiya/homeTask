import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Picture extends Document {
    @Prop({ required: true })
    url: string;

    @Prop({ required: true })
    userId: string;
}

export const PictureSchema = SchemaFactory.createForClass(Picture);
