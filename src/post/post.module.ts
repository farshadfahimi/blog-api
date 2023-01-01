import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './post.schema';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostRepositories } from './post.repositories';
import { ReplyModule } from './replies/reply.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    ReplyModule,
  ],
  providers: [PostRepositories, PostService],
  controllers: [PostController],
})
export class PostModule {}