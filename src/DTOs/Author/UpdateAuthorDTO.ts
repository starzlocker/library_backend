import {
  assertNumber,
  assertObject,
  assertString,
} from '../../utils/TypeAssertions.js';

export interface UpdateAuthorDTO {
  id: number;
  name: string;
}

export function assertUpdateAuthorDTO(
  data: unknown,
): asserts data is UpdateAuthorDTO {
  assertObject(data);
  assertNumber(data.id);
  assertString(data.name);
}
