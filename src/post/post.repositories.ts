import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, PopulateOptions } from "mongoose";
import { EntityRepository } from "src/entity";
import { StorePostDto } from "./dto";
import { Post, PostDocument } from "./post.schema";
import { Reply } from "./replies/reply.schema";

@Injectable()
export class PostRepositories extends EntityRepository<PostDocument> {
  constructor(
    @InjectModel('Post') protected readonly post: Model<PostDocument>
  ) { super(post) }

  get defaultLimit() :number {
    return 12
  }

  get defaultPopulates() :string[] {
    return ['auther', 'category']
  }

  async updateCover(id: string, cover: string) :Promise<PostDocument> {
    return this.post.findByIdAndUpdate(id, {
      cover,
    })
  }

  async updateReplies(id: string, replies: Reply[]) {
    return this.post.findByIdAndUpdate(id, { replies })
  }

  async findNewest() :Promise<PostDocument[]> {
    return this.post.find({ approvedAt: { $ne: null } }).populate(this.defaultPopulates).sort({ created_at: -1 }).limit(this.defaultLimit)
  }

  async findLongest() :Promise<PostDocument[]> {
    return this.post.find({ approvedAt: { $ne: null } }).populate(this.defaultPopulates).sort({ body: -1 }).limit(this.defaultLimit)
  }

  async findShortest() :Promise<PostDocument[]> {
    return this.post.find({ approvedAt: { $ne: null } }).populate(this.defaultPopulates).sort({ body: 1 }).limit(this.defaultLimit)
  }

  async mostChallenge() :Promise<PostDocument[]> {
    return this.post.find({ approvedAt: { $ne: null } }).populate(this.defaultPopulates).sort({ comments: -1 }).limit(this.defaultLimit)
  }
}