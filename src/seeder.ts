import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { seeder } from "nestjs-seeder";
import { Category, CategorySchema } from "./categories/categories.schema";
import { CategorySeeder } from "./categories/categories.seeder";
import { Post, PostSchema } from "./post/post.schema";
import { PostSeeder } from "./post/post.seeder";
import { Reply, ReplySchema } from "./post/replies/reply.schema";
import { User, UserSchema } from "./user/user.schema";
import { UserSeeder } from "./user/user.seeder";

seeder({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017', {
      dbName: 'tutorial'
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Post.name, schema: PostSchema },
      { name: Reply.name, schema: ReplySchema }
    ])
  ]
})
.run([
  UserSeeder,
  CategorySeeder,
  PostSeeder
])