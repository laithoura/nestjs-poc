import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { jwtConfig } from "../constants/jwt.contant";
import { IS_PUBLIC_KEY } from "../decorators/public-route.decortor";

@Injectable()
export class JwtAuthGuard extends AuthGuard(jwtConfig.strategyId) {

    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        // Add your custom authentication logic here
        // for example, call super.logIn(request) to establish a session.
        
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }

        return super.canActivate(context);
      }
}
