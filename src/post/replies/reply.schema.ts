import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types, Document } from "mongoose";
import { Factory } from "nestjs-seeder";
import { LikeAbstract } from "src/like/like.abstract";
import { LikeFactory } from "src/like/like.factory";
import { UserDocument } from "src/user/user.schema";

export type ReplyDocument = Reply & Document

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true
  }
})
export class Reply extends LikeAbstract {
  @Prop({
    required: true
  })
  @Factory((faker) => faker.lorem.text)
  body: string

  @Prop({
    type: Types.ObjectId,
    ref: 'User'
  })
  auther: UserDocument

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    default: null
  })
  approvedBy?: UserDocument

  @Prop({
    default: null,
  })
  approvedAt?: Date

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'reply' }],
    default: [],
  })
  replies?: ReplyDocument[]
}

export const ReplySchema = SchemaFactory.createForClass(Reply)

LikeFactory(ReplySchema)

ReplySchema.virtual('repliesCount').get(function(this: Reply) {
  return this.replies.length
})

ReplySchema.virtual('isApproved').get(function(this: Reply) {
  return !!this.approvedBy
})

ReplySchema.pre('save', function(this: ReplyDocument, next: Function) {
  if (this.isModified('approvedBy')) {
    this.approvedAt = this.approvedBy === null ? null : new Date()
  }
})