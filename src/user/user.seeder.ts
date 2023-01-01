import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DataFactory, Seeder } from "nestjs-seeder";
import { User, UserDocument } from "./user.schema";

@Injectable()
export class UserSeeder implements Seeder {
  constructor(
    @InjectModel(User.name) private readonly user: Model<UserDocument>
  ) {}

  async seed(): Promise<any> {
    const users  = DataFactory.createForClass(User).generate(10)

    return this.user.insertMany(users)
  }

  async drop(): Promise<any> {
    return this.user.deleteMany({})
  }

}