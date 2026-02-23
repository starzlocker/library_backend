import { isInstanceOfDate, isNonEmptyString, isNumber, isObject } from "../utils/TypeAssertions.js";

function assertGenre(data:unknown): asserts data is Genre {
  isObject(data);
  isNonEmptyString(data.name);
  if (data.id) isNumber(data.id);
  if (data.createdAt) isInstanceOfDate(data.createdAt)
  if (data.updateAt) isInstanceOfDate(data.updateAt)
}
export class Genre {
  id: number | null
  name: string
  createdAt: Date | null
  updatedAt: Date | null

	constructor(data:unknown) {
    assertGenre(data);
		this.id = data.id || null;
		this.name = data.name;
		this.createdAt = data.createdAt || null;
		this.updatedAt = data.updatedAt || null;
	}
}

