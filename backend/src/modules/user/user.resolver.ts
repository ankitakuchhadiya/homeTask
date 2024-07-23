import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.schema';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { AuthService } from '../auth/auth.service';

@Resolver(of => User)
export class UserResolver {
    constructor(
        private userService: UserService,
        private authService: AuthService,
    ) {}

    @Mutation(returns => User)
    async createAccount(@Args('email') email: string, @Args('password') password: string) {
        return this.authService.createUser(email, password);
    }

    @Query(returns => User)
    @UseGuards(JwtAuthGuard)
    async myProfile(@Context() context) {
        const user = await this.userService.findById(context.req.user.userId);
        return user;
    }
}
