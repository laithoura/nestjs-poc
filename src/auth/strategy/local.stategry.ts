import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../service/auth/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'email',
            passwordField: 'password',
        });
    }

    async validate(email: string, password: string): Promise<any> {
        if (!email || !email.trim()) {
            throw new BadRequestException('email should not be empty');
        }
        if (!password || !password.trim()) {
            throw new BadRequestException('password should not be empty');
        }

        const user = await this.authService.validateUser(email, password);
        if (!user) {
          throw new UnauthorizedException('Email or Password is incorrect');
        }
        return user;
    }
}