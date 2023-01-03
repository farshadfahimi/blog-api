import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Factory } from "nestjs-seeder";
import * as argon from 'argon2'
import { Post, PostDocument } from "src/post/post.schema";

export type UserDocument = User & Document

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true
  }
})
export class User {
  @Factory((faker) => faker.name.firstName())
  @Prop()
  firstName?: string

  @Factory((faker) => faker.name.lastName())
  @Prop()
  lastName?: string

  @Factory((faker) => faker.internet.email())
  @Prop({
    type: String,
    unique: true,
    lowercase: true,
  })
  email: string

  @Prop()
  @Factory((faker) => faker.lorem.words(1))
  password: string

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Post' }],
    default: []
  })
  bookmarks?: PostDocument[]

  @Prop({ default: Date.now() })
  createdAt: Date

  @Prop({ default: Date.now() })
  updatedAt: Date
}

export const UserSchema = SchemaFactory.createForClass(User)

UserSchema.virtual('name').get(function(this: UserDocument) {
  if (this.firstName && this.lastName)
    return `${this.firstName} ${this.lastName}`

  return `unknown`
})

UserSchema.pre("save", async function (this: UserDocument, next: Function) {
  if (this.isNew || this.isModified('password'))
    this.password = await argon.hash(this.password)

  next()
})