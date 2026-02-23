import {
  assertDate,
  assertNonEmptyString,
  assertNumber,
  assertObject,
} from '../utils/TypeAssertions.js';

function assertGenre(data: unknown): asserts data is Genre {
  assertObject(data);
  assertNonEmptyString(data.name);
  if (data.id) assertNumber(data.id);
  if (data.createdAt) assertDate(data.createdAt);
  if (data.updateAt) assertDate(data.updateAt);
}
export class Genre {
  id: number | null;
  name: string;
  createdAt: Date | null;
  updatedAt: Date | null;

  constructor(data: unknown) {
    assertGenre(data);
    this.id = data.id || null;
    this.name = data.name;
    this.createdAt = data.createdAt || null;
    this.updatedAt = data.updatedAt || null;
  }
}
