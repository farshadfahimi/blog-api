import { Module } from "@nestjs/common";
import { AlgoliaService } from "./algolia.service";
import { ElastService } from "./elastic.service";

@Module({
  providers: [
    ElastService,
    AlgoliaService
  ]
})
export class SearchModule {}