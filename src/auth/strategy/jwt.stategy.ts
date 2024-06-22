import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConfig } from "src/auth/constants/jwt.contant";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, jwtConfig.strategyId) {
    constructor() {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: jwtConfig.secret,
      });
    }

    async validate(payload: any) {
        return payload.user;
    }
}