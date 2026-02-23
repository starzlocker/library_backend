import {
  assertNumber,
  assertObject,
  assertString,
} from '../../utils/TypeAssertions.js';

export interface BookDTO {
  id: number;
  title: string;
  author_id: number;
  genre_id: number;
  year: number;
  cover_url: string;
  description: string;
  stock: number;
  price: number;
  created_at: Date;
  updated_at: Date;
}

export function assertBookDTO(data: unknown): asserts data is BookDTO {
  assertObject(data);
  assertString(data.title);
  assertNumber(data.author_id);
  assertNumber(data.genre_id);
  assertString(data.year);
  assertString(data.cover_url);
  assertString(data.description);
  assertNumber(data.stock);
  assertNumber(data.price);
  assertString(data.created_at);
  assertString(data.updated_at);
}
