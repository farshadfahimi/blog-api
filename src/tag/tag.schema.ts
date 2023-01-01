import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type TagDocument = Tag & Document

@Schema({
  toJSON: {
    virtuals: true,
  }
})
export class Tag {
  @Prop({
    required: true
  })
  display: string

  @Prop({
    required: true,
    unique: true
  })
  slug: string
}

export const TagSchema = SchemaFactory.createForClass(Tag)