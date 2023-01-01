import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Factory } from "nestjs-seeder";
import { slugify } from "src/helpers";

export type CategoryDocumnet = Category & Document

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
  }
})
export class Category {
  @Prop({
    required: true
  })
  @Factory((faker) => faker.lorem.sentence(3))
  title: string

  @Prop({
    required: true,
    unique: true,
    pre: (val) => { console.log(val) },
  })
  @Factory((faker) => faker.lorem.slug(3))
  slug: string
}

export const CategorySchema = SchemaFactory.createForClass(Category)

CategorySchema.pre('save', function (this: CategoryDocumnet, next: Function) {
  if (this.isModified('slug'))
    this.slug = slugify(this.slug)

  next()
})