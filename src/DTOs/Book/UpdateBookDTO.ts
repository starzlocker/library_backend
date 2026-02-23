import {
  assertNonEmptyString,
  assertNumber,
  assertObject,
} from '../../utils/TypeAssertions.js';

export type UpdateBookDTO = {
  id?:number;
  title?: string;
  author?: number;
  genre?: number;
  year?: string;
  coverUrl?: string;
  description?: string;
  stock?: number;
  price?: number;
};

export function assertUpdateBookDTO(
  data: unknown,
): asserts data is UpdateBookDTO {
  assertObject(data);
  if ('id' in data) assertNumber(data.id)
  if ('title' in data) assertNonEmptyString(data.title);
  if ('author' in data) assertNumber(data.author);
  if ('genre' in data) assertNumber(data.genre);
  if ('year' in data) assertNonEmptyString(data.year);
  if ('coverUrl' in data) assertNonEmptyString(data.coverUrl);
  if ('description' in data) assertNonEmptyString(data.description);
  if ('stock' in data) assertNumber(data.stock);
  if ('price' in data) assertNumber(data.price);
}
