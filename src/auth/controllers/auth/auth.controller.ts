import { Body, ClassSerializerInterceptor, Controller, Get, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from 'src/auth/service/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { OkApiResponseInterceptor } from 'src/common/interceptor/api-response/ok-api-response.interceptor';
import { Throttle } from '@nestjs/throttler';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiOkArrayResponse } from 'src/common/api-doc/api-response.decorator';
import { LoginResposneDto } from 'src/auth/dtos/login-response.dto';
import { LoginRequestDto } from 'src/auth/dtos/login-request.dto';
import { UserEntity } from 'src/typeorm/entities/user.entity';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { PublicRoute } from 'src/auth/decorators/public-route.decortor';

@ApiTags('Auth')
@ApiBearerAuth('JWT')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Throttle({ default: { limit: 100, ttl: 1000 } })
    @PublicRoute()
    @Post('login')
    @UseGuards(LocalAuthGuard)
    @ApiOperation({ summary: 'Login' })
    @ApiOkArrayResponse(LoginResposneDto, 'Success')
    @UseInterceptors(OkApiResponseInterceptor)
    async login(@Req() req, @Body() loginRequest: LoginRequestDto): Promise<LoginResposneDto> {
        return {
            ... await this.authService.login(req.user),
            user: req.user
        };
    }

    @Roles(['ADMIN', 'USER']) // Test Preventing Route by JWT & Roles Based => Response Success
    @Get('me')
    @ApiOperation({ summary: 'Me' })
    @ApiOkArrayResponse(UserEntity, 'Success')
    @UseInterceptors(OkApiResponseInterceptor)
    async getMe(@Req() req): Promise<UserEntity> {
        return req.user;
    }

    @Roles(['ADMIN', 'USER', 'GUEST']) // Test Preventing Route by JWT & Roles Based => Response 403
    @Get('me2')
    @ApiOperation({ summary: 'Me2 -> Response 403' })
    @ApiOkArrayResponse(UserEntity, 'Success')
    @UseInterceptors(OkApiResponseInterceptor)
    async getMe2(@Req() req): Promise<UserEntity> {
        return req.user;
    }
}
