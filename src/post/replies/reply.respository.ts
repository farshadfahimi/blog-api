import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { EntityRepository } from "src/entity";
import { ReplyDocument } from "./reply.schema";

@Injectable()
export class ReplyRepository extends EntityRepository<ReplyDocument> {
  constructor(
    @InjectModel('Reply') protected replyModel: Model<ReplyDocument>
  ) { super(replyModel) }
}