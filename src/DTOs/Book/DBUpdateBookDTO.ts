export interface DBUpdateBookDTO {
  title: string;
  author_id: number;
  genre_id: number;
  year: number;
  cover_url: string | null;
  description: string;
  stock: number;
  isbn: string | null;
  price: string;
}