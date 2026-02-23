import {
  assertNonEmptyString,
  assertNumber,
  assertObject,
  isNonNullable,
} from '../../utils/TypeAssertions.js';

export type GetBookDTO = {
  title: string | undefined;
  author: string | undefined;
  year: string | undefined;
  genre: string | undefined;
};

export function assertGetBookDTO(data: unknown): asserts data is GetBookDTO {
  assertObject(data);
  if (data.title) assertNonEmptyString(data.title);
  if (data.author) assertNonEmptyString(data.author);
  if (isNonNullable(data.year)) assertNumber(data.year);
  if (data.genre) assertNonEmptyString(data.genre);
}
