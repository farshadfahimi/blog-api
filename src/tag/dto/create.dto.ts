import { IsNotEmpty, IsString } from "class-validator"


export class CreateTagDto {
  @IsString()
  @IsNotEmpty()
  display: string

  @IsString()
  @IsNotEmpty()
  slug: string
}