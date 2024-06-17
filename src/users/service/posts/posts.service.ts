import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from 'src/typeorm/entities/post.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { UserEntity } from 'src/typeorm/entities/user.entity';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(PostEntity) private postRepository: Repository<PostEntity>,
        private usersService: UsersService) {
        console.log('Init Posts Service');
    }

    async createUserPost(createPost: CreateUserPostParams) : Promise<PostEntity> {
        const user = await this.usersService.fetchUserById(createPost.userId);
        if (!user) {
            throw new HttpException('User Id ' + createPost.userId + ' not found', HttpStatus.BAD_REQUEST);
        }

        delete createPost['userId'];
        const newPost = await this.postRepository.create({...createPost, user, createdAt: new Date()});
        const savedPost = await this.postRepository.save(newPost);
        return await this.fetchUserPostById(savedPost.id);
    }

    async updateUserPost(id: number, updatePost: UpdateUserPostParams) : Promise<PostEntity> {
        const exsit = this.postRepository.countBy({id});
        if (!exsit) {
            throw new HttpException('Post Id ' + id + ' not found', HttpStatus.BAD_REQUEST);
        }

        delete updatePost['userId'];
        await this.postRepository.update({id}, {...updatePost, updatedAt: new Date()});
        return await this.fetchUserPostById(id);
    }

    async fetchAllUserPosts(): Promise<PostEntity[]> {
        return await this.postRepository.find({
            loadRelationIds: true
        });
    }

    async fetchUserPostById(id: number): Promise<PostEntity> {
        const post = await this.postRepository.findOne({
            where: {id},
            relations: ['user'],
        });
        if (!post) {
            throw new HttpException('Post Id ' + id + ' not found', HttpStatus.BAD_REQUEST);
        }

        return post;
    }

    async fetchUserPostByUserId(userId: number): Promise<PostEntity[]> {
        await this.usersService.userExistOrElseThrowException(userId);
        
        const user = new UserEntity;
        user.id = userId;
        return this.postRepository.find({
            where: {user: user},
            loadRelationIds: true
        });
    }
}
