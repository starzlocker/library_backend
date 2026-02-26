import {
  assertDate,
  assertNumber,
  assertObject,
  assertString,
  isNonNullable,
} from '../../utils/TypeAssertions.js';

export interface DBBookDTO {
  id: number;
  title: string;
  author_id: number;
  genre_id: number;
  author: string;
  genre: string;
  year: number;
  cover_url: string | null;
  description: string;
  stock: number;
  isbn: string | null;
  price: string; // NUMERIC é string
  created_at: Date;
  updated_at: Date;
}

export function assertDBBookDTO(data: unknown): asserts data is DBBookDTO {
  assertObject(data);
  assertString(data.title, 'title');
  assertNumber(data.author_id, 'author_id');
  assertNumber(data.genre_id, 'genre_id');
  assertString(data.author, 'author');
  assertString(data.genre, 'genre');
  
  assertNumber(data.year, 'year');
  if (isNonNullable(data.cover_url)) assertString(data.cover_url, 'cover_url');
  if (isNonNullable(data.isbn)) assertString(data.isbn, 'isbn');
  assertString(data.description, 'description');
  assertNumber(data.stock, 'stock');
  assertString(data.price, 'price');

  assertDate(data.created_at, 'created_at');
  assertDate(data.updated_at, 'updated_at');
}