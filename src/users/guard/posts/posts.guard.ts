import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class PostsGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const headers = context.switchToHttp().getRequest().headers;
    console.log('Posts Guard Headers : ' , headers);
    return true;
  }
}
