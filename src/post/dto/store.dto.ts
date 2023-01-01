import { IsNotEmpty } from 'class-validator'
import { UserDocument } from 'src/user/user.schema'
import { CreatePostDto } from './create.dto'

export class StorePostDto extends CreatePostDto {
  @IsNotEmpty()
  auther: UserDocument
}