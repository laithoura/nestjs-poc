import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class PostsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log('Inside PostsMiddleware');
    const {params} = req.headers;
    console.log('PostsMiddleware -> params : ', params);
    next();
  }
}
