import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class UsersMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log('Inside UsersMiddleware');
    const {params, authorization} = req.headers;
    console.log('UsersMiddleware -> authorization : ' + authorization);
    console.log('UsersMiddleware -> params : ', params);
    if (!authorization) {
      throw new UnauthorizedException('No Authentication Token');
    }

    if (authorization != 'Bearer valid') {
      throw new UnauthorizedException('Invalid Authenthication Token');
    }

    next();
  }
}
