import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateStudentDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly name: string

  @IsNumber()
  @IsNotEmpty()
  readonly roleNumber: number

  @IsNumber()
  @IsNotEmpty()
  readonly class: number

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly gender: string

  @IsNumber()
  @IsNotEmpty()
  readonly marks: number
}

export class UpdateStudentDto extends PartialType(CreateStudentDto) {}
