import { Controller, Get, HttpCode, HttpStatus, Post, Req, Session, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthenctedGuard, LocalAuthGuard } from 'src/auth/utils/local-auth.guard';

@Controller('auth')
export class AuthController {

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(@Req() req: Request) {
        console.log('Login Request: ', req.body);
    }

    @Get('session')
    @UseGuards(AuthenctedGuard)
    async getAuthSession(@Session() session : Record<string, any>) {
        return session;
    }

    @Get('user')
    @UseGuards(AuthenctedGuard)
    async getAuthStatus(@Req() req: Request): Promise<Express.User> {
        return req.user;
    }
}
