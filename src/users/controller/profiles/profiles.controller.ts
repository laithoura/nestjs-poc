import { Body, Controller, Get, HttpStatus, Param, Query, ParseIntPipe, Post, UseGuards, UseInterceptors, ClassSerializerInterceptor, UseFilters, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';
import { PageDto } from 'src/common/dtos/page.dto';
import { ApiOkObjectResponse, ApiOkArrayResponse, ApiPaginatedResponse } from 'src/common/api-doc/api-response.decorator';
import { ProfileEntity } from 'src/typeorm/entities/profile.entity';
import { ModifyUserProfileDto } from 'src/users/dtos/modify-user-profile.dto';
import { OkApiResponseInterceptor } from 'src/common/interceptor/api-response/ok-api-response.interceptor';
import { ProfilesService } from 'src/users/service/profiles/profiles.service';

@ApiTags('User Profile')
@ApiBearerAuth('JWT')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('profiles')
export class ProfilesController {
    constructor(private profilesService: ProfilesService) {
    }

    @Post()
    @ApiOperation({ summary: 'Modify user profile' })
    @ApiOkObjectResponse(ProfileEntity, 'Modify Successfully')
    @UseInterceptors(OkApiResponseInterceptor)
    async modifyUserProfile(
        @Body() userProfile: ModifyUserProfileDto,
        @Req() req) :Promise<ProfileEntity> {
        return this.profilesService.modifyUserProfile(req.user.id, userProfile);
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
