import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DataFactory, Seeder } from "nestjs-seeder";
import { Category, CategoryDocumnet } from "./categories.schema";

export class CategorySeeder implements Seeder {
  constructor(
    @InjectModel(Category.name) private readonly category: Model<CategoryDocumnet>
  ) {}

  async seed(): Promise<any> {
    const categories = DataFactory.createForClass(Category).generate(2)

    return this.category.insertMany(categories)
  }

  async drop(): Promise<any> {
    return this.category.deleteMany()
  }

}