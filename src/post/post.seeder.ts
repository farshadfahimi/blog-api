import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DataFactory, Seeder } from "nestjs-seeder";
import { Category, CategoryDocumnet } from "src/categories/categories.schema";
import { User, UserDocument } from "src/user/user.schema";
import { Post, PostDocument } from "./post.schema";

export class PostSeeder implements Seeder {
  constructor(
    @InjectModel(Post.name) private readonly post: Model<PostDocument>,
    @InjectModel(User.name) private readonly user: Model<UserDocument>,
    @InjectModel(Category.name) private readonly category: Model<CategoryDocumnet>
  ) {}

  async seed(): Promise<any> {
    const users = DataFactory.createForClass(User).generate(1)
    const categories = DataFactory.createForClass(Category).generate(1)
    const user: User = await this.user.create(users[0])
    const category: Category = await this.category.create(categories[0])

    const posts = DataFactory.createForClass(Post).generate(5)

    for (const post of posts) {
      post.category = category
      post.auther = user
    }

    return this.post.insertMany(posts)
  }

  async drop(): Promise<any> {
    return this.post.deleteMany({})
  }

}