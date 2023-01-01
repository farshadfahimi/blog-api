import { Transform } from "class-transformer"
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"
import { slugify } from "src/helpers"

export class CreateCategoriesDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  title: string

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  @Transform(({ value }) => slugify(value))
  slug: string
}