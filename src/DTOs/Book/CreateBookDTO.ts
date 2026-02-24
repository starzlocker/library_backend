import { assertNonEmptyString, assertNumber, assertObject, assertString } from "../../utils/TypeAssertions.js";

export type CreateBookDTO = {
  title: string;
  author: string;
  genre: string;
  year: number | null;
  price: number | null;
  stock: number;
  isbn: string | null;
  cover_url: string | null;
  description: string | null;
  author_id?: number | null;
  genre_id?: number | null;
};

export function assertCreateBookDTO(data: unknown): asserts data is CreateBookDTO {
  assertObject(data);
  assertNonEmptyString(data.title);
  assertNonEmptyString(data.author);
  assertNonEmptyString(data.genre);
  assertNumber(data.stock);
  if (data.cover_url) assertString(data.cover_url)
  if (data.isbn) assertString(data.isbn)
  if (data.description) assertString(data.description)
  if (data.year) assertNumber(data.year);
  if (data.price) assertNumber(data.price);
}