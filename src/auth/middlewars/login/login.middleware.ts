import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';
import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { LoginDto } from 'src/auth/dtos/login.dto';
import { convertValidationErrors } from 'src/common/utils/validate-error.converter';

@Injectable()
export class LoginMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: () => void) {
    const loginDto = new LoginDto(req.body.email, req.body.password);
    const errors = convertValidationErrors(await validate(loginDto));
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
    next();
  }
}
