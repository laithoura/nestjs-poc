import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileEntity } from 'src/typeorm/entities/profile.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { PostEntity } from 'src/typeorm/entities/post.entity';
import { PageDto } from 'src/common/dtos/page.dto';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';
import { PageMetaDto } from 'src/common/dtos/page-meta.dto';

@Injectable()
export class ProfilesService {

    constructor(
        private usersService: UsersService,
        @InjectRepository(ProfileEntity) private profileRepository: Repository<ProfileEntity>) {
        console.log('Init Profiles Service')
    }

    async createUserProfile(userId: number, createProfile: CreateUserProfileParams): Promise<ProfileEntity> {
        await this.usersService.userExistOrElseThrowException(userId);
        const newProfile = this.profileRepository.create({
            ...createProfile,
            createdAt: new Date()
        });

        const savedProfile = await this.profileRepository.save(newProfile);
    
        this.usersService.updateUserProfile(userId, savedProfile.id);

        return savedProfile;
    }

    async updateUserProfile(id: number, userId: number, updateProfile: UpdateUserProfileParams): Promise<ProfileEntity> {
        const exist = await this.profileRepository.countBy({id}) > 0;
        if (!exist) {
            throw new BadRequestException('Profile Id ' + id + ' not found');
        }

        try {    
            delete updateProfile['userId'];
            await this.profileRepository.update({ id }, { ...updateProfile, updatedAt: new Date() });
            await this.usersService.updateUserProfile(userId, id);
            return await this.fetchUserProfileById(id);
        } catch(error) {
            console.error('Error Updating User Profile : ', error);
            throw new BadRequestException('Failed to update user profile');
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
