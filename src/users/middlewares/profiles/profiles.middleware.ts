import { HttpException, HttpStatus, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class ProfilesMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log('Inside ProfilesMiddleware');
    const {params, authorization} = req.headers;
    console.log('ProfilesMiddleware -> authorization : ' + authorization);
    console.log('ProfilesMiddleware -> params : ', params);
    if (!authorization) {
      throw new UnauthorizedException('No Authentication Token');
    }

    if (authorization != 'Bearer valid') {
      throw new UnauthorizedException('Invalid Authenthication Token');
    }

    next();
  }
}

