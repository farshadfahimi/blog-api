import { Document, FilterQuery, Model, UpdateQuery } from "mongoose";
import { IEntity } from "./entity.interface";

export abstract class EntityRepository<T extends Document> implements IEntity {
  constructor(protected readonly entityModel: Model<T>) {}
  
  async findById(id: string, projection = {}) :Promise<T | null> {
    return this.entityModel.findById(id, { ...projection })
  }

  async findOne(entityFilterQuery: FilterQuery<any>, projection?: Record<string, unknown>) {
    return this.entityModel.findOne(entityFilterQuery, { ...projection })
  }

  async find(entityFilterQuery: FilterQuery<Object>) :Promise<T[] | null> {
    return this.entityModel.find(entityFilterQuery)
  }

  async create(entityData: unknown) :Promise<T> {
    const entity = new this.entityModel(entityData)
    
    await entity.save()

    return entity
  }

  async update(entityFilter: FilterQuery<Object>, entityData: UpdateQuery<unknown>) :Promise<T | null> {
    return this.entityModel.findOneAndUpdate(entityFilter, { ...entityData }, { new: true })
  }

  async updateById(id: string, entityData: UpdateQuery<unknown>) :Promise<T | null> {
    return this.entityModel.findByIdAndUpdate(id, { ...entityData }, { new: true })
  }

  async deleteMany(deleteFilterQuery: FilterQuery<Object>) :Promise<boolean> {
    const deletedResult = await this.entityModel.deleteMany(deleteFilterQuery)

    return deletedResult.deletedCount >= 1
  }

  async deleteOne(deleteFilterQuery: FilterQuery<Object>) :Promise<T | null> {
    return this.entityModel.findOneAndDelete(deleteFilterQuery)
  }

  async deleteById(id: string) :Promise<T | null> {
    return this.entityModel.findByIdAndDelete(id)
  }
}