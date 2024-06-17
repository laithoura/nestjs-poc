import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class ProfilesMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log('Inside Profile Middleware');
    const {authorization} = req.headers;
    console.log('authorization : ' + authorization);
    if (!authorization) {
      throw new HttpException('No Authentication Token', HttpStatus.UNAUTHORIZED);
    }

    if (authorization != 'Bearer valid') {
      throw new HttpException('Invalid Authenthication Token', HttpStatus.UNAUTHORIZED);
    }

    next();
  }
}

