import { FilterQuery, UpdateQuery } from "mongoose"


export interface IEntity {
  findById(id: string, projection?: Record<string, unknown>)

  findOne(entityFilterQuery: FilterQuery<Object>, projection?: Record<string, unknown>)

  find(entityFilterQuery: FilterQuery<Object>)

  create(entityData: unknown)

  update(entityFilter: FilterQuery<Object>, entityData: UpdateQuery<unknown>)

  updateById(id: string, entityData: UpdateQuery<unknown>)

  deleteMany(deleteFilterQuery: FilterQuery<Object>)

  deleteOne(deleteFilterQuery: FilterQuery<Object>)

  deleteById(id: string)
}