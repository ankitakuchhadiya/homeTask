import {Resolver, Query, Mutation, Args, Context} from '@nestjs/graphql';
import { PictureService } from './picture.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { Picture } from './picture.schema';

@Resolver(() => Picture)
export class PictureResolver {
    constructor(private readonly pictureService: PictureService) {}

    @UseGuards(JwtAuthGuard)
    @Mutation(() => String)
    async uploadPicture(
        @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
        @Context() context: any,
    ): Promise<string> {
        const { createReadStream, filename, mimetype, encoding } = file;
        const buffer = await this.streamToBuffer(createReadStream);
        const uploadFile: any = {
            buffer,
            originalname: filename,
            mimetype,
            size: buffer.length,
            fieldname: '',
            encoding,
        };
        return this.pictureService.uploadFile(uploadFile, context.req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => [Picture])
    async getAllMyUploadedPictures(@Context() context: any): Promise<Picture[]> {
        return this.pictureService.getAllMyUploadedPictures(context.req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => Boolean)
    async deletePicture(@Args('key') key: string, @Context() context: any): Promise<boolean> {
        await this.pictureService.deletePicture(context.req.user.userId, key);
        return true;
    }

    private streamToBuffer(stream: any): Promise<Buffer> {
        return new Promise<Buffer>((resolve, reject) => {
            const chunks: any[] = [];
            stream.on('data', (chunk: any) => chunks.push(chunk));
            stream.on('end', () => resolve(Buffer.concat(chunks)));
            stream.on('error', reject);
        });
    }
}
