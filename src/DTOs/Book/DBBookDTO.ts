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
  year: number;
  cover_url: string;
  description: string;
  stock: number;
  price: string; // NUMERIC é string
  created_at: Date;
  updated_at: Date;
}

export function assertDBBookDTO(data: unknown): asserts data is DBBookDTO {
  assertObject(data);
  assertString(data.title, 'title');
  if (isNonNullable(data.author_id)) assertNumber(data.author_id, 'author_id');
  if (isNonNullable(data.genre_id)) assertNumber(data.genre_id, 'genre_id');
  assertNumber(data.year, 'year');
  if (isNonNullable(data.cover_url)) assertString(data.cover_url, 'cover_url');
  if (isNonNullable(data.description)) assertString(data.description, 'description');
  if (isNonNullable(data.stock)) assertNumber(data.stock, 'stock');
  if (isNonNullable(data.price)) assertString(data.price, 'price');
  assertDate(data.created_at, 'created_at');
  assertDate(data.updated_at, 'updated_at');
}
