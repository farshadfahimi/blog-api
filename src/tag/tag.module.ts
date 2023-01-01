import { Module } from '@nestjs/common';
import { TagService } from './tag.service';

@Module({
  imports: [TagService],
  exports: [TagService]
})
export class TagModule {}
