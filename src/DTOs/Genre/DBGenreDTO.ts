import {
  assertDate,
  assertNumber,
  assertObject,
  assertString,
} from '../../utils/TypeAssertions.js';

export interface DBGenreDTO {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export function assertGenreDTO(data: unknown): asserts data is DBGenreDTO {
  assertObject(data);
  assertNumber(data.id);
  assertString(data.name);
  assertDate(data.created_at);
  assertDate(data.updated_at);
}
