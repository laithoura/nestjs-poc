import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseBoolPipe, ParseIntPipe, Post, Put, Query, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { UserEntity } from 'src/typeorm/entities/user.entity';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { PageDto } from 'src/common/dtos/page.dto';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';
import { UpdateUserDto } from 'src/users/dtos/update-user.dto';
import { UsersGuard } from 'src/users/guard/users/users.guard';
import { ValidateCreateUserPipe } from 'src/users/pipe/validate-create-user/validate-create-user.pipe';
import { ValidateUpdateUserPipe } from 'src/users/pipe/validate-update-user/validate-update-user.pipe';
import { UsersService } from 'src/users/service/users/users.service';
import { ApiResponseDto } from 'src/common/dtos/open-api-response.dto';
import { ApiOkObjectResponse, ApiOkArrayResponse, ApiPaginatedResponse } from 'src/swagger/api-response.decorator';

@UseGuards(UsersGuard) // User Guard at Class Level
@ApiTags('Users')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    // @UseGuards(UsersGuard) // User Guard at Method Level
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(new ValidationPipe())
    @ApiOperation({ summary: 'Create new user' })
    @ApiResponse({status: HttpStatus.CREATED, description: 'Created Successfully', schema: {
            allOf: [
                { $ref: getSchemaPath(ApiResponseDto) }, /* Wrapper Class */
                { properties: { data: { $ref: getSchemaPath(UserEntity)} } } /* Generic Class */
            ],
        }
    })
    async createUserBody(
        @Body(ValidateCreateUserPipe) user: CreateUserDto) : Promise<ApiResponseDto<UserEntity>> {
        return new ApiResponseDto<UserEntity>(
            HttpStatus.CREATED,
            'Created',
            await this.usersService.createUser(user)
        )
    }

    // @UseGuards(UsersGuard) // User Guard at Method Level
    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @UsePipes(new ValidationPipe())
    @ApiOperation({ summary: 'Update user' })
    @ApiOkObjectResponse(UserEntity, HttpStatus.OK, 'Updated Successfully')
    async updateUserBody(
        @Param('id', ParseIntPipe) id: number, 
        @Body(ValidateUpdateUserPipe) user: UpdateUserDto) : Promise<ApiResponseDto<UserEntity>> {
        if (id != user.id) {
            throw new HttpException('User ID ' + id + ' not found', HttpStatus.BAD_REQUEST);
        }

        const updatedUser = await this.usersService.updateUser(id, user);
        if (!updatedUser) {
            throw new HttpException('User ID ' + id + ' not found', HttpStatus.BAD_REQUEST);
        }

        return new ApiResponseDto<UserEntity>(
            HttpStatus.OK,
            'Created',
            updatedUser
        )
    }

    // @UseGuards(UsersGuard) // User Guard at Method Level
    @Get('all')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get All Users' })
    @ApiOkArrayResponse(UserEntity, HttpStatus.OK, 'Success')
    async getUsers() : Promise<ApiResponseDto<UserEntity[]>> {
        return new ApiResponseDto<UserEntity[]>(
            HttpStatus.OK,
            'Success',
            await this.usersService.fetchUsers()
        )
    }

    @Get('paging')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({summary: 'Get Users Pagination'})
    @ApiPaginatedResponse(UserEntity, HttpStatus.OK, 'Success')
    async getPagingUsers(
        @Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<UserEntity>> {
        return this.usersService.getPagingUsers(pageOptionsDto);
    }


    // @UseGuards(UsersGuard) // User Guard at Method Level
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get User By Id' })
    @ApiOkObjectResponse(UserEntity, HttpStatus.OK, 'Success')
    async getUserById(
        @Param('id', ParseIntPipe) id: number,
        @Query('admin', new ParseBoolPipe({ optional: true })) admin: boolean) 
        : Promise<ApiResponseDto<UserEntity>> {
        const user = await this.usersService.fetchUserById(id);
        if (!user) {
            throw new HttpException('User ID ' + id + ' not found', HttpStatus.BAD_REQUEST);
        }

        return new ApiResponseDto<UserEntity>(
            HttpStatus.OK,
            'Success',
            user
        )
    }

    // @UseGuards(UsersGuard) // User Guard at Method Level
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({summary: 'Delete User By Id'})
    @ApiResponse({status: HttpStatus.NO_CONTENT, description: 'Deleted Successfully'})
    async deleteUserById(@Param('id', ParseIntPipe) id: number) {
        const user = await this.usersService.fetchUserById(id);
        if (!user) {
            throw new HttpException('User ID ' + id + ' not found', HttpStatus.BAD_REQUEST);
        }

        await this.usersService.deleteUserById(id)
    }
}
