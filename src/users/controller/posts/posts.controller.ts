import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiCreatedObjectResponse, ApiOkArrayResponse, ApiOkObjectResponse } from 'src/common/api-doc/api-response.decorator';
import { PostEntity } from 'src/typeorm/entities/post.entity';
import { CreateUserPostDto } from 'src/users/dtos/create-user-post.dto';
import { UpdateUserPostDto } from 'src/users/dtos/update-user-post.dto';
import { PostsGuard } from 'src/users/guard/posts/posts.guard';
import { CreatedApiResponseInterceptor } from 'src/common/interceptor/api-response/created-api-response.interceptor';
import { OkApiResponseInterceptor } from 'src/common/interceptor/api-response/ok-api-response.interceptor';
import { PostsService } from 'src/users/service/posts/posts.service';
import { HttpExceptionFilter } from 'src/common/filter/http-exception.filter';

@ApiTags('User Post')
@UseGuards(PostsGuard) // User Guard at Class Level
@UseInterceptors(ClassSerializerInterceptor)
@UseFilters(new HttpExceptionFilter())
@Controller('posts')
export class PostsController {

    constructor(private postsService: PostsService) {
        console.log('Init Posts Service')
    }

    @Post()
    @ApiOperation({ summary: 'Create new post' })
    @ApiCreatedObjectResponse(PostEntity, 'Created Successfully')
    @UseInterceptors(CreatedApiResponseInterceptor)
    async createUserPost(@Body() post: CreateUserPostDto) : Promise<PostEntity> {
        return this.postsService.createUserPost(post);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update post' })
    @ApiOkArrayResponse(PostEntity, 'Updated Successfully')
    @UseInterceptors(OkApiResponseInterceptor)
    async updateUserPost(@Param('id', ParseIntPipe) id: number, @Body() post: UpdateUserPostDto) : Promise<PostEntity> {
        if (id != post.id) {
            throw new BadRequestException('User Id ' + id + ' not found');
        }

        return this.postsService.updateUserPost(id, post);
    }

    @Get()
    @ApiOperation({ summary: 'Get All Posts' })
    @ApiOkArrayResponse(PostEntity, 'Success')
    @UseInterceptors(OkApiResponseInterceptor)
    async getAllUserPost() : Promise<PostEntity[]> {
        return this.postsService.fetchAllUserPosts()
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get Post By Id' })
    @ApiOkObjectResponse(PostEntity, 'Success')
    @UseInterceptors(OkApiResponseInterceptor)
    async getUserPostById(@Param('id', ParseIntPipe) id: number): Promise<PostEntity> {
        return this.postsService.fetchUserPostById(id)
    }

    @Get('/users/:userId')
    @ApiOperation({ summary: 'Get Posts By User Id' })
    @ApiOkObjectResponse(PostEntity, 'Success')
    @UseInterceptors(OkApiResponseInterceptor)
    async getUserPostByUserId(@Param('userId', ParseIntPipe) userId: number) : Promise<PostEntity[]> {
        return this.postsService.fetchUserPostByUserId(userId);
    }

}
