import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ProfilesGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const headers = context.switchToHttp().getRequest().headers;
    console.log('Profiles Guard Headers : ' , headers);
    return true;
  }
}
