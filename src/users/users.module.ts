import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from './controller/users/users.controller';
import { UsersService } from './service/users/users.service';
import { UsersMiddleware } from './middlewares/users/users.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/typeorm/entities/user.entity';
import { ProfileEntity } from 'src/typeorm/entities/profile.entity';
import { ProfilesController } from './controller/profiles/profiles.controller';
import { ProfilesService } from './service/profiles/profiles.service';
import { ProfilesMiddleware } from './middlewares/profiles/profiles.middleware';
import { PostEntity } from 'src/typeorm/entities/post.entity';
import { PostsController } from './controller/posts/posts.controller';
import { PostsService } from './service/posts/posts.service';
import { PostsMiddleware } from './middlewares/posts/posts.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ProfileEntity, PostEntity])],
  controllers: [UsersController, ProfilesController, PostsController],
  providers: [UsersService, ProfilesService, PostsService]
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(UsersMiddleware).forRoutes('users') // By Main Path
    // consumer.apply(UsersMiddleware).forRoutes(UsersController) //  By Controller
    /** -> By Specific Route Path & RequestMethod
    consumer.apply(UsersMiddleware).forRoutes({
      path: 'users',
      method: RequestMethod.GET
    })
    */
    consumer.apply(UsersMiddleware).forRoutes(UsersController)
    consumer.apply(ProfilesMiddleware).forRoutes(ProfilesController)
    consumer.apply(PostsMiddleware).forRoutes(PostsController)
  }

}
