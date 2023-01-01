import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreateTagDto } from './dto';
import { Tag, TagDocument } from './tag.schema';

@Injectable()
export class TagService {
  constructor(
    @InjectModel(Tag.name) private readonly model: Model<TagDocument>
  ) {}

  async find(filters: FilterQuery<Object>) {
    const tags = await this.model.find(filters, {})

    return tags
  }

  async findOne(id: string) {
    const tag = await this.model.findById(id)

    return tag
  }

  async store(dto: CreateTagDto) {
    const tag = await this.model.create({
      display: dto.display,
      slug: dto.slug
    })

    return tag
  }
}
