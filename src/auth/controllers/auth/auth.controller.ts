import { Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @UseGuards(AuthGuard('local'))
    async login(@Request() req) {
        
    }
}
