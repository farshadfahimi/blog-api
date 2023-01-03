import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Factory } from "nestjs-seeder";
import { CategoryDocumnet } from "src/categories/categories.schema";
import { slugify } from "src/helpers";
import { LikeAbstract } from "src/like/like.abstract";
import { LikeFactory } from "src/like/like.factory";
import { Tag } from "src/tag/tag.schema";
import { User, UserDocument } from "src/user/user.schema";
import { ReplyDocument } from "./replies/reply.schema";

export type PostDocument = Post & Document

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
})
export class Post extends LikeAbstract {
  @Prop({
    required: true,
  })
  @Factory((faker) => faker.lorem.words(5))
  title: string

  @Prop({
    required: true,
    unique: true,
    lowercase: true
  })
  @Factory((faker) => faker.lorem.slug(3))
  slug: string

  @Prop()
  @Factory((faker) => faker.lorem.lines(1))
  shortBody?: string

  @Prop({
    required: true
  })
  @Factory((faker) => faker.lorem.paragraphs(10))
  body: string

  @Prop()
  cover?: string

  @Prop({
    type: Types.ObjectId,
    ref: 'Category'
  })
  category: CategoryDocumnet

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
  })
  auther: UserDocument

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    default: null
  })
  approved?: User

  @Prop({
    type: Date,
    default: null,
  })
  approvedAt?: Date

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Tag' }],
    default: []
  })
  tags?: Tag[]

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Reply' }],
    default: [],
  })
  replies?: ReplyDocument[]
}

export const PostSchema = SchemaFactory.createForClass(Post)

PostSchema.virtual('tagsCount').get(function(this: PostDocument) {
  return this.tags.length
})

PostSchema.virtual('repliesCount').get(function (this: PostDocument) {
  return this.replies.length
})

PostSchema.virtual('link').get(function(this: PostDocument) {
  if (this.populated('Category'))
    return `/${this.category.slug}/${this.slug}`

  return `/${this.slug}`
})

PostSchema.virtual('isApproved').get(function(this: PostDocument) {
  return !!this.approved
})

PostSchema.pre('save', function(this: PostDocument, next: Function) {
  if (!this.slug)
    this.slug = this.title

  if (this.isModified('slug'))
    this.slug = slugify(this.slug)

  next()
})

PostSchema.pre('save', function (this: PostDocument, next: Function) {
  if (this.isModified('approved'))
    this.approvedAt = this.approved ? new Date() : null
})

LikeFactory(PostSchema)