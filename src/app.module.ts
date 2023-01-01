import { Module } from '@nestjs/common';
import { Authmodule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from './post/post.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot("mongodb://127.0.0.1:27017", {
      dbName: 'tutorial',
    }),
    Authmodule, 
    UserModule,
    PostModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
