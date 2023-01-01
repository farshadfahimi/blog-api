import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student as IStudent } from './student.interface';
import { CreateStudentDto, UpdateStudentDto } from './student.dto'

@Injectable()
export class StudentService {
  constructor(@InjectModel('Student') private studentModal: Model<IStudent>) {}

  async create(dto: CreateStudentDto): Promise<IStudent> {
    const student = await new this.studentModal(dto)

    return student.save()
  }

  async update(id: string, dto: UpdateStudentDto): Promise<IStudent> {
    const student = await this.studentModal.findByIdAndUpdate(id, dto, {
      new: true
    })

    if (!student)
      throw new NotFoundException(`not Found the student`)

    return student
  }

  async all(): Promise<IStudent[]> {
    const students = await this.studentModal.find()

    if (!students || students.length === 0)
      throw new NotFoundException('not Found data')

    return students
  }

  async find(id: string): Promise<IStudent> {
    const student = await this.studentModal.findById(id).exec()

    if (!student)
      throw new NotFoundException('NotFound')

    return student
  }

  async delete(id: string): Promise<IStudent> {
    const student = await this.studentModal.findByIdAndDelete(id)

    if (!student)
      throw new NotFoundException('Notfound')

    return student
  }
}
