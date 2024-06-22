import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseBoolPipe, ParseIntPipe, Post, Put, Query, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from 'src/typeorm/entities/user.entity';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { PageDto } from 'src/common/dtos/page.dto';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';
import { ValidateCreateUserPipe } from 'src/users/pipe/validate-create-user/validate-create-user.pipe';
import { UsersService } from 'src/users/service/users/users.service';
import { ApiOkObjectResponse, ApiOkArrayResponse, ApiPaginatedResponse, ApiCreatedObjectResponse } from 'src/common/api-doc/api-response.decorator';
import { OkApiResponseInterceptor } from 'src/common/interceptor/api-response/ok-api-response.interceptor';
import { CreatedApiResponseInterceptor } from 'src/common/interceptor/api-response/created-api-response.interceptor';
import { HttpExceptionFilter } from 'src/common/filter/http-exception.filter';
import { PublicRoute } from 'src/auth/decorator/public-key.decortor';

@ApiTags('Users')
@UseInterceptors(ClassSerializerInterceptor)
@UseFilters(new HttpExceptionFilter())
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    // @UseGuards(JwtAuthGuard) // Use Guard at Method Level
    @PublicRoute()
    @Post()
    @ApiOperation({ summary: 'Create new user' })
    @ApiCreatedObjectResponse(UserEntity, 'Created Successfully')
    @UseInterceptors(CreatedApiResponseInterceptor)
    async createUserBody(
        @Body(ValidateCreateUserPipe) user: CreateUserDto) : Promise<UserEntity> {
        return this.usersService.createUser(user);
    }

    @Get('all')
    @ApiOperation({ summary: 'Get All Users' })
    @ApiOkArrayResponse(UserEntity, 'Success')
    @UseInterceptors(OkApiResponseInterceptor)
    async getUsers() : Promise<UserEntity[]> {
        return this.usersService.fetchUsers()
    }

    @Get('paging')
    @ApiOperation({summary: 'Get Users Pagination'})
    @ApiPaginatedResponse(UserEntity, HttpStatus.OK, 'Success')
    async getPagingUsers(
        @Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<UserEntity>> {
        return this.usersService.getPagingUsers(pageOptionsDto);
    }


    @Get(':id')
    @ApiOperation({ summary: 'Get User By Id' })
    @ApiOkObjectResponse(UserEntity, 'Success')
    @UseInterceptors(OkApiResponseInterceptor)
    async getUserById(
        @Param('id', ParseIntPipe) id: number,
        @Query('admin', new ParseBoolPipe({ optional: true })) admin: boolean) 
        : Promise<UserEntity> {
        const user = await this.usersService.fetchUserById(id);
        if (!user) {
            throw new BadRequestException('User Id ' + id + ' not found');
        }

        return user;
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({summary: 'Delete User By Id'})
    @ApiResponse({status: HttpStatus.NO_CONTENT, description: 'Deleted Successfully'})
    async deleteUserById(@Param('id', ParseIntPipe) id: number) {
        const user = await this.usersService.fetchUserById(id);
        if (!user) {
            throw new BadRequestException('User Id ' + id + ' not found');
        }

        await this.usersService.deleteUserById(id)
    }
}
