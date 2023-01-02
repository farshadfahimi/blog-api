import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './categories.repositories';
import { CategoryDocumnet } from './categories.schema';
import { CreateCategoriesDto } from './dto';

@Injectable()
export class CategoriesService {
  constructor(private categoryRepo: CategoryRepository) {}

  async list() :Promise<CategoryDocumnet[]> {
    return await this.categoryRepo.list()
  }

  async findOne(id: string) :Promise<CategoryDocumnet> {
    return await this.categoryRepo.findById(id)
  }

  async store(dto: CreateCategoriesDto) :Promise<CategoryDocumnet> {
    return await this.categoryRepo.create(dto)
  }

  async udpate(id: string, dto: CreateCategoriesDto) :Promise<CategoryDocumnet> {
    return await this.categoryRepo.updateById(id, dto)
  }

  async delete(id: string) {
    return await this.categoryRepo.deleteById(id)
  }
}
