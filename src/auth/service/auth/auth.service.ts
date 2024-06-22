import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/service/users/users.service';
import { comparePasswords } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private jwtService: JwtService) {
        console.log('Init AuthService');
    }

    async validateUser(email: string, rawPassword: string): Promise<any> {
        const user = await this.usersService.fetchUserByEmail(email);
        if (user) {
            try {
                const isValidPassword = await comparePasswords(rawPassword, user.password);
                if (isValidPassword) {
                    const { password, ...result } = user;
                    return result;
                }
            } catch(error) {
              console.error(error);
            }
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.email, sub: user.id, user: user };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
}
