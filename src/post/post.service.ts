import { Injectable } from "@nestjs/common";
import { CreatePostDto, UpdatepostDto } from "./dto";
import { UserDocument } from "src/user/user.schema";
import { ListTransformer } from "./transformer";
import { PostRepositories } from "./post.repositories";
import { ReplyRepository } from "./replies/reply.respository";

@Injectable()
export class PostService {
  constructor(
    private postRepo: PostRepositories,
    private replyRepo: ReplyRepository
  ) {}

  async newestPost() :Promise<any[]> {
    const posts = await this.postRepo.findNewest()

    return posts.map(post => post.toJSON({ transform: ListTransformer }))
  }

  async shortestPost() :Promise<any[]> {
    const posts = await this.postRepo.findShortest()

    return posts.map(post =>post.toJSON({ transform: ListTransformer }))
  }

  async longestPost() :Promise<any[]> {
    const posts = await this.postRepo.findLongest()

    return posts.map(post => post.toJSON({ transform: ListTransformer }))
  }

  async mostChallange() :Promise<any[]> {
    const posts = await this.postRepo.mostChallenge()

    return posts.map(post => post.toJSON({ transform: ListTransformer }))
  }

  async findOne(id: string) {
    const post = await this.postRepo.findById(id)

    await post.populate([{
      path: 'comments',
      populate: {
        path: 'auther',
      }
    }])
    
    return post.toJSON()
  }

  async save(dto: CreatePostDto, user: UserDocument) {
    const post = await this.postRepo.create({ ...dto, auther: user })

    return post.toObject()
  }

  async update(id: string, dto: UpdatepostDto, user: UserDocument) {
    const post = await this.postRepo.updateById(id, { ...dto, auther: user })

    return post.toObject()
  }

  async updateCover(id: string, filename: string) {
    const post = await this.postRepo.updateCover(id, filename)

    return post.toJSON()
  }

  async destroy(id: string) {
    const post = await this.postRepo.deleteById(id)
    
    return post.toJSON()
  }

  // async addComments(id: string, dto: CreateReplyDto, user: UserDocument) {
  //   const post = await this.postRepo.findById(id)
  //   const reply = await this.replyRepo.create({ ...dto, auther: user })

  //   post.replies.push(reply)

  //   await this.postRepo.updateReplies(id, post.replies)

  //   return reply
  // }

  // async addBookmark(user: UserDocument, id: string) {
  //   const post = await this.model.findById(id)

  //   if (user.bookmarks && !user.bookmarks.includes(post.id)) {
  //     user.bookmarks.push(post.id)
  //   } else {
  //     user.bookmarks = [post.id]
  //   }

  //   await user.save()
  // }

  // async removeBookmark(user: UserDocument, id: string) {
  //   const post = await this.model.findById(id)

  //   if (user.bookmarks) {
  //     user.bookmarks.splice(user.bookmarks.indexOf(post.id), 1)

  //     await user.save()
  //   }
  // }
}