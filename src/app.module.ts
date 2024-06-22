import { Module } from '@nestjs/common';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import allEntities from './typeorm/all-entities';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { RolesGuard } from './auth/guards/roles.guard';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_EXPOSE_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      entities: allEntities,
      database: process.env.DB_DATABASE_NAME,
      synchronize: true
    }),
    ClientsModule.register([
      {
        name: 'MATH_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: process.env.REDIS_HOST,
          port: +process.env.REDIS_EXPOSE_PORT,
        }
      },
    ]),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD, /* Globally apply JwtAuthGuard */
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD, /* Globally apply RolesGuard */
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD, /* Globally apply ThrottlerGuard */
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
