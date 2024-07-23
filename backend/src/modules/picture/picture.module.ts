import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PictureService } from './picture.service';
import { PictureResolver } from './picture.resolver';
import { Picture, PictureSchema } from './picture.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Picture.name, schema: PictureSchema }]),
        ConfigModule,
    ],
    providers: [PictureService, PictureResolver],
})
export class PictureModule {}
