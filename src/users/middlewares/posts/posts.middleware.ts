import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class PostsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log('Inside PostsMiddleware');
    const {params, authorization} = req.headers;
    console.log('PostsMiddleware -> authorization : ' + authorization);
    console.log('PostsMiddleware -> params : ', params);
    if (!authorization) {
      throw new UnauthorizedException('No Authentication Token');
    }

    if (authorization != 'Bearer valid') {
      throw new UnauthorizedException('Invalid Authenthication Token');
    }

    next();
  }
}
