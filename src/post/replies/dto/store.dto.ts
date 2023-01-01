import { IsNotEmpty, isNotEmpty, IsString } from "class-validator";
import { User } from "src/user/user.schema";
import { CreateReplyDto } from "./create.dto";


export class StoreReplyDto extends CreateReplyDto {
  @IsString()
  @IsNotEmpty()
  auther: User
}