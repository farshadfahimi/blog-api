import { Prop } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { User } from "src/user/user.schema";

export abstract class LikeAbstract {
  @Prop({
    type: [{ type: Types.ObjectId, ref: 'User' }],
    default: []
  })
  likes?: User[]
}