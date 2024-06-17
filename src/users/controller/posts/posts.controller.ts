import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserPostDto } from 'src/users/dtos/create-user-post.dto';
import { UpdateUserPostDto } from 'src/users/dtos/update-user-post.dto';
import { PostsGuard } from 'src/users/guard/posts/posts.guard';
import { PostsService } from 'src/users/service/posts/posts.service';

@UseGuards(PostsGuard)
@Controller('posts')
export class PostsController {

    constructor(private postsService: PostsService) {
        console.log('Init Posts Service')
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(new ValidationPipe())
    async createUserPost(@Body() post: CreateUserPostDto) {
        return {
            statusCode: HttpStatus.CREATED,
            message: 'Created',
            data: await this.postsService.createUserPost(post)
        }
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @UsePipes(new ValidationPipe())
    async updateUserPost(@Param('id', ParseIntPipe) id: number, @Body() post: UpdateUserPostDto) {
        if (id != post.id) {
            throw new HttpException('User ID ' + id + ' not found', HttpStatus.BAD_REQUEST);
        }

        return {
            statusCode: HttpStatus.OK,
            message: 'Updated',
            data: await this.postsService.updateUserPost(id, post)
        }
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAllUserPost() {
        return {
            statusCode: HttpStatus.OK,
            message: 'Success',
            data: await this.postsService.fetchAllUserPosts()
        }
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getUserPostById(@Param('id', ParseIntPipe) id: number) {
        return {
            statusCode: HttpStatus.OK,
            message: 'Success',
            data: await this.postsService.fetchUserPostById(id)
        }
    }

    @Get('/users/:userId')
    @HttpCode(HttpStatus.OK)
    async getUserPostByUserId(@Param('userId', ParseIntPipe) userId: number) {
        return {
            statusCode: HttpStatus.OK,
            message: 'Success',
            data: await this.postsService.fetchUserPostByUserId(userId)
        }
    }

}
