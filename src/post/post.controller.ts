import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { Express } from 'express'
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUser } from 'src/auth/decorator';
import { UserDocument } from 'src/user/user.schema';
import { JWTGuarad } from '../auth/guard';
import { CreatePostDto, UpdatepostDto } from './dto';
import { PostService } from './post.service';
import { diskStorage } from 'multer';
import { CreateReplyDto } from './replies/dto';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Get('/newest')
  async newestPosts() {
    return await this.postService.newestPost()
  }

  @Get('/shortest')
  async shortPost() {
    return await this.postService.shortestPost()
  }

  @Get('/longest')
  async longPost() {
    return await this.postService.longestPost()
  }

  @Get('most-challenge')
  async mostChallenge() {
    return await this.postService.mostChallange()
  }

  @Get('/:id')
  async show(@Param('id') id: string) {
    return await this.postService.findOne(id)
  }

  @Post('/')
  @UseGuards(JWTGuarad)
  async store(@Body() dto: CreatePostDto, @GetUser() user: UserDocument) {
    return await this.postService.save(dto, user)
  }

  @Post('/:id/cover')
  @UseGuards(JWTGuarad)
  @UseInterceptors(FileInterceptor('cover', { storage: diskStorage({
    destination: './post-covers',
  }) }))
  async uploadCover(@Param() id: string, @UploadedFile() cover: Express.Multer.File) :Promise<void> {
    this.postService.updateCover(id, cover.filename)
  }

  @Put('/:id')
  @UseGuards(JWTGuarad)
  async update(@Param('id') id: string, @Body() dto: UpdatepostDto, @GetUser() user: UserDocument) {
    const post = this.postService.update(id, dto, user)

    return post
  }

  @Delete('/:id')
  @UseGuards(JWTGuarad)
  async delete(@Param('id') id: string) {
    const post = this.postService.destroy(id)

    return post
  }

  @Get('/:id/replies')
  async findReplies(@Param('id') id: string) :Promise<any[]> {
    const replies = this.postService.findReplies(id)

    return replies
  }

  @Post('/:id/replies')
  @UseGuards(JWTGuarad)
  async storeComment(@Param('id') id: string, @Body() dto: CreateReplyDto, @GetUser() user: UserDocument) {
    const comment = await this.postService.addReply(id, dto, user)

    return comment
  }
}
