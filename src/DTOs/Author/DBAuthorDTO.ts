import {
  assertDate,
  assertNumber,
  assertObject,
  assertString,
} from '../../utils/TypeAssertions.js';

export interface DBAuthorDTO {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export function assertAuthorDTO(data: unknown): asserts data is DBAuthorDTO {
  assertObject(data);
  assertNumber(data.id);
  assertString(data.name);
  assertDate(data.created_at);
  assertDate(data.updated_at);
}
