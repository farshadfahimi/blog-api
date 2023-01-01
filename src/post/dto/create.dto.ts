import { Type } from "class-transformer"
import { ArrayMaxSize, IsArray, IsNotEmpty, IsString, MaxLength, MinLength, Validate } from "class-validator"

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  @MinLength(5)
  title: string

  @IsNotEmpty()
  @IsString()
  @MaxLength(120)
  @MinLength(5)
  slug: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  @MinLength(20)
  shortBody: string

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  body: string

  @IsString()
  @IsNotEmpty()
  category: string

  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(5)
  tags?: string
}

export class UpdatepostDto extends CreatePostDto {}