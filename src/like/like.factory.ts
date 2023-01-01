import { Schema } from "mongoose";
import { LikeAbstract } from "./like.abstract";

export function LikeFactory(schema: Schema) {
  schema.virtual('likesCount').get(function(this: Document & LikeAbstract) {
    this.likes.length
  })
}