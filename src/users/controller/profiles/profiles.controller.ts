import { Body, Controller, Get, HttpException, HttpStatus, Param, Query, ParseIntPipe, Post, Put, UseGuards, UseInterceptors, ClassSerializerInterceptor, BadRequestException, UseFilters } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';
import { PageDto } from 'src/common/dtos/page.dto';
import { ApiOkObjectResponse, ApiOkArrayResponse, ApiPaginatedResponse, ApiCreatedObjectResponse } from 'src/common/api-doc/api-response.decorator';
import { ProfileEntity } from 'src/typeorm/entities/profile.entity';
import { CreateUserProfileDto } from 'src/users/dtos/create-user-profile.dto';
import { UpdateUserProfileDto } from 'src/users/dtos/update-user-profile.dto';
import { ProfilesGuard } from 'src/users/guard/profiles/profiles.guard';
import { CreatedApiResponseInterceptor } from 'src/common/interceptor/api-response/created-api-response.interceptor';
import { OkApiResponseInterceptor } from 'src/common/interceptor/api-response/ok-api-response.interceptor';
import { ProfilesService } from 'src/users/service/profiles/profiles.service';
import { HttpExceptionFilter } from 'src/common/filter/http-exception.filter';
import { AuthenctedGuard } from 'src/auth/utils/local-auth.guard';

@ApiTags('User Profile')
@UseGuards(ProfilesGuard) // User Guard at Class Level
@UseGuards(AuthenctedGuard)
@UseInterceptors(ClassSerializerInterceptor)
@UseFilters(new HttpExceptionFilter())
@Controller('profiles')
export class ProfilesController {
    constructor(private profilesService: ProfilesService) {
        console.log('Init Profiles Service')
    }

    @Post()
    @ApiOperation({ summary: 'Create new user profile' })
    @ApiCreatedObjectResponse(ProfileEntity, 'Created Successfully')
    @UseInterceptors(CreatedApiResponseInterceptor)
    async createUserProfile(@Body() userProfile: CreateUserProfileDto) : Promise<ProfileEntity> {
        return this.profilesService.createUserProfile(userProfile.userId, userProfile);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update user profile' })
    @ApiOkObjectResponse(ProfileEntity, 'Updated Successfully')
    @UseInterceptors(OkApiResponseInterceptor)
    async updateUserProfile(
        @Param('id', ParseIntPipe) id: number,
        @Body() userProfile: UpdateUserProfileDto) :Promise<ProfileEntity> {
        if (id != userProfile.id) {
            throw new BadRequestException('Profile Id ' + id + ' not found');
        }

        const updatedUserProfile = await this.profilesService.updateUserProfile(id, userProfile.userId, userProfile);
        if (!updatedUserProfile) {
            throw new BadRequestException('Profile Id ' + id + ' not found');
        }

        return updatedUserProfile;
    }

    @Get('all')
    @ApiOperation({ summary: 'Get All User Profiles' })
    @ApiOkArrayResponse(ProfileEntity, 'Success')
    @UseInterceptors(OkApiResponseInterceptor)
    async fetchAllProfiles() : Promise<ProfileEntity[]> {
        return this.profilesService.fetchAllProfiles()
    }


    @Get('paging')
    @ApiOperation({summary: 'Get User Profiles Pagination'})
    @ApiPaginatedResponse(ProfileEntity, HttpStatus.OK, 'Success')
    async getPagingProfiles(
        @Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<ProfileEntity>> {
        return this.profilesService.getPagingProfiles(pageOptionsDto);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get User Profile By Id' })
    @ApiOkObjectResponse(ProfileEntity, 'Success')
    @UseInterceptors(OkApiResponseInterceptor)
    async fetchProfileById(@Param('id', ParseIntPipe) id: number) : Promise<ProfileEntity> {
        return this.profilesService.fetchUserProfileById(id);
    }
}
