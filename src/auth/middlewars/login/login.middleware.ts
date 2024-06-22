import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';
import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { LoginRequestDto } from 'src/auth/dtos/login-request.dto';
import { convertValidationErrors } from 'src/common/utils/validate-error.converter';

@Injectable()
export class LoginMiddleware implements NestMiddleware {
  
  private static count: number = 0;

  async use(req: Request, res: Response, next: () => void) {
    LoginMiddleware.count++;
    console.log(LoginMiddleware.count+ '. LoginMiddleware-> use-> email: ' + req.body.email);
    const loginDto = new LoginRequestDto(req.body.email, req.body.password);
    const errors = convertValidationErrors(await validate(loginDto));
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
    next();
  }
}
