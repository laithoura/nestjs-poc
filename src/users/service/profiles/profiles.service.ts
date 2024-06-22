import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileEntity } from 'src/typeorm/entities/profile.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { PageDto } from 'src/common/dtos/page.dto';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';
import { PageMetaDto } from 'src/common/dtos/page-meta.dto';

@Injectable()
export class ProfilesService {

    constructor(
        private usersService: UsersService,
        @InjectRepository(ProfileEntity) private profileRepository: Repository<ProfileEntity>) {
    }

    async modifyUserProfile(userId: number, modifyUserProfile: ModifyUserProfileParams): Promise<ProfileEntity> {
        const user = await this.usersService.fetchUserById(userId);
        if (!user) {
            throw new BadRequestException('User Id ' + userId + ' not found');
        }

        if (!user.profile) {
            const newProfile = this.profileRepository.create({
                ...modifyUserProfile,
                createdAt: new Date()
            });
            const savedProfile = await this.profileRepository.save(newProfile);
            this.usersService.updateUserProfile(userId, savedProfile.id);
            return await this.fetchUserProfileById(savedProfile.id);
        } else {
            try {
                await this.profileRepository.update({ id: user.id }, { ...modifyUserProfile, updatedAt: new Date() });
                return await this.fetchUserProfileById(user.id);
            } catch(error) {
                console.error('Error Updating User Profile : ', error);
                throw new BadRequestException('Failed to update user profile');
            }
        }        
    }

    async fetchUserProfileById(id: number): Promise<ProfileEntity> {
        return await this.profileRepository.findOneBy({id})
    }

    async fetchAllProfiles(): Promise<ProfileEntity[]> {
        return await this.profileRepository.find()
    }

    async getPagingProfiles(pageOptionsDto: PageOptionsDto): Promise<PageDto<ProfileEntity>> {
        const queryBuilder = this.profileRepository.createQueryBuilder("user_profiles");

        queryBuilder
            .orderBy("user_profiles.created_at", pageOptionsDto.order)
            .skip(pageOptionsDto.skip)
            .take(pageOptionsDto.limit);

        const itemCount = await queryBuilder.getCount();
        const { entities } = await queryBuilder.getRawAndEntities();

        const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

        return new PageDto(entities, pageMetaDto);
    }

}
