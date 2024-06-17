import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './typeorm/entities/user.entity';
import { ProfileEntity } from './typeorm/entities/profile.entity';
import { PostEntity } from './typeorm/entities/post.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'user',
      password: 'password',
      entities: [UserEntity, ProfileEntity, PostEntity],
      database: 'nestjs-db',
      synchronize: true
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
