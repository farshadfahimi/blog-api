import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, PopulateOptions } from "mongoose";
import { EntityRepository } from "src/entity";
import { Category, CategoryDocumnet } from "./categories.schema";
import { StoreCategoryDto } from "./dto";

@Injectable()
export class CategoryRepository extends EntityRepository<CategoryDocumnet> {
  constructor(
    @InjectModel(Category.name) private readonly category: Model<CategoryDocumnet>
  ) { super(category) }

  async list() :Promise<CategoryDocumnet[]> {
    return this.category.find()
  }
}