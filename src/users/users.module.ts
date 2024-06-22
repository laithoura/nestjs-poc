import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersController } from './controller/users/users.controller';
import { UsersService } from './service/users/users.service';
import { UsersMiddleware } from './middlewares/users/users.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesController } from './controller/profiles/profiles.controller';
import { ProfilesService } from './service/profiles/profiles.service';
import { ProfilesMiddleware } from './middlewares/profiles/profiles.middleware';
import { PostsController } from './controller/posts/posts.controller';
import { PostsService } from './service/posts/posts.service';
import { PostsMiddleware } from './middlewares/posts/posts.middleware';
import { NextFunction, Response } from 'express';
import userEntities from 'src/typeorm/user-entities';

@Module({
  imports: [TypeOrmModule.forFeature(userEntities)],
  controllers: [UsersController, ProfilesController, PostsController],
  providers: [
    UsersService,
    ProfilesService,
    PostsService
  ],
  exports: [
    UsersService
  ]
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
    consumer
      .apply(UsersMiddleware)
      .exclude({
        path: 'excluded-path',
        method: RequestMethod.GET
      })
      .forRoutes(UsersController);

    consumer
      .apply(ProfilesMiddleware)
      .forRoutes(ProfilesController);
    
    consumer
      .apply(PostsMiddleware)
      .forRoutes(PostsController);


    /* Test Arrow Function Middle */
    consumer.apply((req: Request, res: Response, next: NextFunction) => {
      console.log('Arrow Function Middleware');
      next();
    }).forRoutes(UsersController, ProfilesController, PostsController);
  }

}
