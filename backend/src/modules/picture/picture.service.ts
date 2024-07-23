import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Picture } from './picture.schema';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class PictureService {
    private s3: AWS.S3;

    constructor(
        @InjectModel(Picture.name) private pictureModel: Model<Picture>,
        private configService: ConfigService,
    ) {
        this.s3 = new AWS.S3({
            accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
            secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
            region: this.configService.get<string>('AWS_REGION'),
        });
    }

    async uploadFile(file: Express.Multer.File, userId: string): Promise<string> {
        const uploadResult = await this.s3.upload({
            Bucket: this.configService.get<string>('AWS_S3_BUCKET_NAME'),
            Key: `${userId}/${uuid()}-${file.originalname}`,
            Body: file.buffer,
            ContentType: file.mimetype,
        }).promise();

        const picture = new this.pictureModel({ url: uploadResult.Location, userId });
        await picture.save();
        return uploadResult.Location;
    }

    async getAllMyUploadedPictures(userId: string): Promise<Picture[]> {
        return this.pictureModel.find({ userId }).exec();
    }

    async deletePicture(userId: string, key: string): Promise<void> {
        await this.s3.deleteObject({
            Bucket: this.configService.get<string>('AWS_S3_BUCKET_NAME'),
            Key: key,
        }).promise();
        await this.pictureModel.deleteOne({ url: `https://${this.configService.get<string>('AWS_S3_BUCKET_NAME')}.s3.amazonaws.com/${key}`, userId }).exec();
    }
}
