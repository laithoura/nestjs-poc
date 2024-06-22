import { Controller, Get, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from 'src/auth/service/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/guard/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Request } from 'express';
import { OkApiResponseInterceptor } from 'src/common/interceptor/api-response/ok-api-response.interceptor';
import { PublicRoute } from 'src/auth/decorator/public-key.decortor';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @PublicRoute()
    @Post('login')
    @UseGuards(LocalAuthGuard)
    @UseInterceptors(OkApiResponseInterceptor)
    async login(@Req() req: Request) {
        return {
            ... await this.authService.login(req.user),
            user: req.user
        };
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(OkApiResponseInterceptor)
    async getAuthStatus(@Req() req): Promise<any> {
        return req.user;
    }
}
