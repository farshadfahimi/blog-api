import { Injectable } from "@nestjs/common";
import { CreatePostDto, UpdatepostDto } from "./dto";
import { UserDocument } from "src/user/user.schema";
import { ListTransformer } from "./transformer";
import { PostRepositories } from "./post.repositories";
import { CreateReplyDto } from "./replies/dto";
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

  async findReplies(id: string) {
    const post = await this.postRepo.findById(id)

    const { replies } = await post.populate({
      path: 'replies',
      match: { approvedBy: { $ne: null } }
    })

    return replies
  }

  async addReply(id: string, dto: CreateReplyDto, user: UserDocument) {
    const post = await this.postRepo.findById(id)
    const reply = await this.replyRepo.create({ ...dto, auther: user })

    post.replies.push(reply)

    await this.postRepo.updateReplies(id, post.replies)

    return reply
  }
}