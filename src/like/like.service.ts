import { Injectable } from "@nestjs/common";
import { Document, Model } from "mongoose";
import { UserDocument } from "src/user/user.schema";
import { LikeAbstract } from "./like.abstract";

@Injectable()
export class LikeService {
  constructor(private readonly likeModel: Model<Document & LikeAbstract>) {}

  async addLike(user: UserDocument, id: string) {
    const entity = await this.likeModel.findById(id)
    entity.likes.push(user.id)

    await entity.save()
  }

  async removeLike(user: UserDocument, id: string) {
    const entity = await this.likeModel.findById(id)
    entity.likes.splice(entity.likes.indexOf(user.id), 1)

    await entity.save()
  }

  async isLiked(user: UserDocument, id: string) {
    const entity = await this.likeModel.findById(id)

    return !!entity.likes.includes(user.id)
  }
}