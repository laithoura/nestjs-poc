import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './service/auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/typeorm/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './utils/local-stategry';
import { UsersService } from 'src/users/service/users/users.service';
import { ProfileEntity } from 'src/typeorm/entities/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ProfileEntity]), PassportModule],
  controllers: [AuthController],
  providers: [
    {
      provide: 'USERS_SERVICE',
      useClass: UsersService
    },
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService
    }, 
    LocalStrategy
  ],
})
export class AuthModule {}
