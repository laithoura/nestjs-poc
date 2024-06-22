import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/roles.decorator';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get(Roles, context.getHandler());
    if (!requiredRoles || !requiredRoles.length) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as any;

    if (!user || !user.roles || !user.roles.length) {
        throw new ForbiddenException('User has no all required roles.');
    }


    // User must has all required roles for this request path
    const valid = requiredRoles.every(requiredRole => user.roles.includes(requiredRole));
    if (!valid) {
        throw new ForbiddenException('User has no all required roles.');
    }

    return true;
  }
}