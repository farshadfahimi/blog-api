import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ReplyRepository } from "./reply.respository";
import { Reply, ReplySchema } from "./reply.schema";
import { ReplyService } from "./reply.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reply.name, schema: ReplySchema }
    ])
  ],
  providers: [ReplyRepository, ReplyService],
  exports: [ReplyRepository, ReplyService]
})
export class ReplyModule {}