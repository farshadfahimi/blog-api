import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CreateStudentDto, UpdateStudentDto } from './student.dto';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  async index(@Res() response) {
    const students = await this.studentService.all()

    response.json({
      statusCode: HttpStatus.OK,
      data: students,
    })
  }

  @Get("/:id")
  async show(@Param('id') id: string, @Res() response) {
    const student = await this.studentService.find(id)

    return response.json({
      data: student,
      statusCode: HttpStatus.OK,
    })
  }

  @Post()
  async store(@Body() dto: CreateStudentDto, @Res() response) {
    const student = await this.studentService.create(dto)

    return response.json({
      data: student,
      statusCode: HttpStatus.CREATED
    })
  }

  @Put("/:id")
  async update(@Body() dto: UpdateStudentDto, @Res() response, @Param('id') id: string) {
    const student = await this.studentService.update(id, dto)

    return response.json({
      data: student,
      statusCode: HttpStatus.OK,
    })
  }

  @Delete("/:id")
  async destroy(@Param('id') id: string, @Res() response) {
    const student = await this.studentService.delete(id)

    return response.json({
      data: student,
      statusCode: HttpStatus.OK
    })
  }
}
