import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JWTGuarad } from 'src/auth/guard';
import { CategoryDocumnet } from './categories.schema';
import { CategoriesService } from './categories.service';
import { CreateCategoriesDto } from './dto';

@Controller('/categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get('/:id')
  async show(@Param('id') id: string) :Promise<CategoryDocumnet> {
    return await this.categoriesService.findOne(id)
  }

  @UseGuards(JWTGuarad)
  @Post('/')
  async store(@Body() dto: CreateCategoriesDto) :Promise<CategoryDocumnet> {
    return await this.categoriesService.store(dto)
  }

  @UseGuards(JWTGuarad)
  @Put('/:id')
  async update(@Param() id: string, @Body() dto: CreateCategoriesDto) :Promise<CategoryDocumnet> {
    return await this.categoriesService.udpate(id, dto)
  }

  @UseGuards(JWTGuarad)
  @Delete('/')
  async destroy(@Param() id: string) :Promise<void> {
    await this.categoriesService.delete(id)
  }
}
