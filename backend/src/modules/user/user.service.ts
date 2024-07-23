import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async create(userData: Partial<User>): Promise<User> {
        const createdUser = new this.userModel(userData);
        return createdUser.save();
    }

    async findByEmail(email: string): Promise<User | undefined> {
        return this.userModel.findOne({ email }).exec();
    }

    async findById(id: string): Promise<User> {
        return this.userModel.findById(id).exec();
    }
}
