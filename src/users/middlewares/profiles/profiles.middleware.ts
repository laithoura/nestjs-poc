import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class ProfilesMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log('Inside ProfilesMiddleware');
    const {params} = req.headers;
    console.log('ProfilesMiddleware -> params : ', params);
    next();
  }
}

