import { IsArray, IsString } from "class-validator";

export class UpdatePostRepliesDto {
  @IsArray()
  @IsString({ each: true })
  replies: string[]
}