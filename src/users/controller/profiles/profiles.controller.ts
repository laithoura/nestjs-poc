import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Query, ParseIntPipe, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { ApiResponseDto } from 'src/common/dtos/open-api-response.dto';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';
import { PageDto } from 'src/common/dtos/page.dto';
import { ApiOkObjectResponse, ApiOkArrayResponse, ApiPaginatedResponse } from 'src/swagger/api-response.decorator';
import { ProfileEntity } from 'src/typeorm/entities/profile.entity';
import { CreateUserProfileDto } from 'src/users/dtos/create-user-profile.dto';
import { UpdateUserProfileDto } from 'src/users/dtos/update-user-profile.dto';
import { ProfilesGuard } from 'src/users/guard/profiles/profiles.guard';
import { ProfilesService } from 'src/users/service/profiles/profiles.service';

@ApiTags('User Profile')
@UseGuards(ProfilesGuard)
@Controller('/profiles')
export class ProfilesController {
    constructor(private profilesService: ProfilesService) {
        console.log('Init Profiles Service')
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(new ValidationPipe())
    @ApiOperation({ summary: 'Create new user profile' })
    @ApiResponse({status: HttpStatus.CREATED, description: 'Created Successfully', schema: {
            allOf: [
                { $ref: getSchemaPath(ApiResponseDto) }, /* Wrapper Class */
                { properties: { data: { $ref: getSchemaPath(ProfileEntity)} } } /* Generic Class */
            ],
        }
    })
    async createUserProfile(@Body() userProfile: CreateUserProfileDto) : Promise<ApiResponseDto<ProfileEntity>> {
        return new ApiResponseDto<ProfileEntity>(
            HttpStatus.CREATED,
            'Created',
            await this.profilesService.createUserProfile(userProfile.userId, userProfile)
        )
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @UsePipes(new ValidationPipe())
    @ApiOperation({ summary: 'Update user profile' })
    @ApiOkObjectResponse(ProfileEntity, HttpStatus.OK, 'Updated Successfully')
    async updateUserProfile(
        @Param('id', ParseIntPipe) id: number,
        @Body() userProfile: UpdateUserProfileDto) :Promise<ApiResponseDto<ProfileEntity>>{
        if (id != userProfile.id) {
            throw new HttpException('Profile ID ' + id + ' not found', HttpStatus.BAD_REQUEST);
        }

        const updatedUserProfile = await this.profilesService.updateUserProfile(id, userProfile.userId, userProfile);
        if (!updatedUserProfile) {
            throw new HttpException('Profile ID ' + id + ' not found', HttpStatus.BAD_REQUEST);
        }

        return new ApiResponseDto<ProfileEntity>(
            HttpStatus.OK,
            'Updated',
            updatedUserProfile
        )
    }

    @Get('all')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get All User Profiles' })
    @ApiOkArrayResponse(ProfileEntity, HttpStatus.OK, 'Success')
    async fetchAllProfiles() : Promise<ApiResponseDto<ProfileEntity[]>> {
        return new ApiResponseDto<ProfileEntity[]>(
            HttpStatus.OK,
            'Success',
            await this.profilesService.fetchAllProfiles()
        )
    }


    @Get('paging')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({summary: 'Get User Profiles Pagination'})
    @ApiPaginatedResponse(ProfileEntity, HttpStatus.OK, 'Success')
    async getPagingProfiles(
        @Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<ProfileEntity>> {
        return this.profilesService.getPagingProfiles(pageOptionsDto);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get User Profile By Id' })
    @ApiOkObjectResponse(ProfileEntity, HttpStatus.OK, 'Success')
    async fetchProfileById(@Param('id', ParseIntPipe) id: number) : Promise<ApiResponseDto<ProfileEntity>> {
        return new ApiResponseDto<ProfileEntity>(
            HttpStatus.OK,
            'Success',
            await this.profilesService.fetchUserProfileById(id)
        )
    }
}
