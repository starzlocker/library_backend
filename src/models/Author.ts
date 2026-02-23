import { isInstanceOfDate, isNonEmptyString, isNumber, isObject } from "../utils/TypeAssertions.js";

function assertAuthor(data:unknown): asserts data is Author {
  isObject(data);
  isNonEmptyString(data.name);
  if (data.id) isNumber(data.id);
  if (data.createdAt) isInstanceOfDate(data.createdAt)
  if (data.updateAt) isInstanceOfDate(data.updateAt)
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
