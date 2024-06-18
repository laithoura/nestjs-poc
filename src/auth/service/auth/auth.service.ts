import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/service/users/users.service';
import { comparePasswords } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {

    constructor(
        @Inject('USERS_SERVICE') private readonly usersService: UsersService) {

    }

    async validateUser(email: string, rawPassword: string): Promise<any> {
        const user = await this.usersService.fetchUserByEmail(email);
        if (user) {
            try {
                console.log(rawPassword);
                console.log(user);
                const matched = await comparePasswords(rawPassword, user.password);
                if (matched) {
                    const { password, ...result } = user;
                    return result;
                }
            } catch(error) {
              console.error(error);
            }
        }
        return null;
    }
}
