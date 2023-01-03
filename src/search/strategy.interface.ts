export interface SearchStrategy {
  search(text: string) :Promise<any[] | null>

  index(text: string) :Promise<void>
}