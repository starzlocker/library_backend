import {
  assertNonEmptyString,
  assertNumber,
  assertObject,
  isNonNullable,
} from '../../utils/TypeAssertions.js';

export type UpdateBookDTO = {
  id: number;
  title: string;
  authorId: number;
  author: string;
  genre: string;
  genreId: number;
  year: number;
  coverUrl: string | null;
  isbn: string;
  description: string;
  stock: number;
  price: number;
  createdAt: string;
  updatedAt: string;
};

export function assertUpdateBookDTO(
  data: unknown,
): asserts data is UpdateBookDTO {
  assertObject(data);
  assertNumber(data.id);
  assertNonEmptyString(data.title);
  assertNumber(data.authorId);
  assertNumber(data.genreId);
  assertNumber(data.year);
  assertNonEmptyString(data.description);
  assertNumber(data.stock);
  assertNumber(data.price);
  assertNonEmptyString(data.createdAt);
  assertNonEmptyString(data.updatedAt);
  if (isNonNullable(data.coverUrl)) assertNonEmptyString(data.coverUrl);
  if (isNonNullable(data.isbn)) assertNonEmptyString(data.isbn);
}
