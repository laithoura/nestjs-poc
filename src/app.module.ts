import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import allEntities from './typeorm/all-entities';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'user',
      password: 'password',
      entities: allEntities,
      database: 'nestjs-db',
      synchronize: true
    }),
    PassportModule.register({
      session: true
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
