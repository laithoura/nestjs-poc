import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileEntity } from 'src/typeorm/entities/profile.entity';
import { UserEntity } from 'src/typeorm/entities/user.entity';
import { PageDto } from 'src/common/dtos/page.dto';
import { PageMetaDto } from 'src/common/dtos/page-meta.dto';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';
import { DeleteResult, Repository } from 'typeorm';
import { encodePassword } from 'src/utils/bcrypt';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        @InjectRepository(ProfileEntity) private profileRepository: Repository<ProfileEntity>) {
        console.log('Init UsersService Constructor');
    }

    async createUser(createUserDetails: CreateUserParams): Promise<UserEntity> {
        try {
            const password = await encodePassword(createUserDetails.password);
            const newUser = this.userRepository.create({
                ...createUserDetails, 
                password
            });
    
            console.log(newUser)
            return await this.userRepository.save(newUser)
        } catch(error) {
            console.error('Error Creating User : ', error);
            throw new BadRequestException('Email already exist!');
        }
    }

    async updateUser(id: number, updateUserDetails: UpdateUserParams): Promise<UserEntity> {
        const duplicateUser = await this.userRepository.findOneBy({email: updateUserDetails.email})
        if (duplicateUser && duplicateUser.id != id) {
            throw new BadRequestException('Email already exist!');
        }

        const count = await this.userRepository.countBy({id});
        if (count < 1) {
            throw new BadRequestException('User Id ' + id + ' not found');
        }

        try {
            await this.userRepository.update({ id }, { ...updateUserDetails });
            return await this.userRepository.findOneBy({id})
        } catch(error) {
            console.error('Error Updating User : ', error);
            throw new BadRequestException('Failed to update user');
        }
    }

    async fetchUsers(): Promise<UserEntity[]> {
        return await this.userRepository.find({
            relations: ['profile'],
            /* relations: ['profile', 'posts'] */
        });
    }

    async fetchUserById(id: number): Promise<UserEntity> {
        return this.userRepository.findOne({
            where: {id: id},
            relations: ['profile', 'posts'],
        })
    }

    async fetchUserByEmail(email: string) : Promise<UserEntity> {
        return this.userRepository.findOneBy({email});
    }

    async userExist(id: number): Promise<Boolean> {
        return await this.userRepository.countBy({id: id}) > 0;
    }

    async userExistOrElseThrowException(id: number): Promise<Boolean> {
      const userExist = await this.userExist(id);
      if (!userExist) {
        throw new BadRequestException('User Id ' + id + ' not found')
      }
      return true;
    }

    async deleteUserById(id: number): Promise<DeleteResult> {
        return await this.userRepository.delete({id: id})
    }

    async updateUserProfile(id: number, profileId: number): Promise<UserEntity> {
        const user = await this.fetchUserById(id);
        if (!user) {
            throw new BadRequestException('User Id ' + id + ' not found');
        }

        const profile = await this.profileRepository.findOneBy({id: profileId});
        if (!profile) {
            throw new BadRequestException('Profile Id ' + profileId + ' not found');
        }

        user.profile = profile;
        return await this.userRepository.save(user);
    }

    public async getPagingUsers(pageOptionsDto: PageOptionsDto): Promise<PageDto<UserEntity>> {
        const queryBuilder = this.userRepository.createQueryBuilder("users");

        queryBuilder
            .orderBy("users.created_at", pageOptionsDto.order)
            .skip(pageOptionsDto.skip)
            .take(pageOptionsDto.limit);

        const itemCount = await queryBuilder.getCount();
        const { entities } = await queryBuilder.getRawAndEntities();

        const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

        return new PageDto(entities, pageMetaDto);
    }
}
