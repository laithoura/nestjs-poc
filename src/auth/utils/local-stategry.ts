import { Inject, Injectable, Response, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../service/auth/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    
    constructor(
        @Inject('AUTH_SERVICE') private readonly authService: AuthService) {
        super({
            usernameField: 'email'
        });
    }

    async validate(email: string, rawPassword: string) {
        const user = await this.authService.validateUser(email, rawPassword);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}