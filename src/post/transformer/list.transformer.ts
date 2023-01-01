export function ListTransformer(_doc, ret) {
  delete ret.comments
  delete ret.tags

  return ret
}