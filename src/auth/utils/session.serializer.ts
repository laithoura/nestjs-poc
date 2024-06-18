import { Inject } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { UserEntity } from "src/typeorm/entities/user.entity";
import { UsersService } from "src/users/service/users/users.service";

export class SessionSerializer extends PassportSerializer {
    
    constructor(@Inject('USERS_SERVICE') private usersService: UsersService) {
        super();
    }

    serializeUser(user: UserEntity, done: (error, user: UserEntity) => void) {
        console.log('SessionSerializer -> serializeUser');
        done(null, user);
    }

    async deserializeUser(user: UserEntity, done: (error, user: UserEntity) => void) {
        console.log('SessionSerializer -> deserializeUser');
        const userDb = await this.usersService.fetchUserById(user.id);
        return userDb ? done(null, userDb) : done(null, null);
    }
    
}