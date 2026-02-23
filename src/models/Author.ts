import {
  assertDate,
  assertNonEmptyString,
  assertNumber,
  assertObject,
} from '../utils/TypeAssertions.js';

function assertAuthor(data: unknown): asserts data is Author {
  assertObject(data);
  assertNonEmptyString(data.name);
  if (data.id) assertNumber(data.id);
  if (data.createdAt) assertDate(data.createdAt);
  if (data.updateAt) assertDate(data.updateAt);
}

export class Author {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: unknown) {
    assertAuthor(data);
    this.id = data.id;
    this.name = data.name;
    this.createdAt = new Date(data.createdAt);
    this.updatedAt = new Date(data.updatedAt);
  }
}
