export interface BookDTO {
  id: number
  title: string
  author_id: number
  genre_id: number
  year: string
  cover_url: string
  description: string
  stock: number
  price: number
  created_at: Date
  updated_at: Date
}