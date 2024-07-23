import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { PictureModule } from './modules/picture/picture.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.MONGODB_URI),
        GraphQLModule.forRoot({
            typePaths: [join(__dirname, '**/*.graphql')]
        }),
        AuthModule,
        UserModule,
        PictureModule,
    ],
})
export class AppModule {}
