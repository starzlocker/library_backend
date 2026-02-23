import { assertObject, assertString } from '../../utils/TypeAssertions.js';

export interface CreateAuthorDTO {
  name: string;
}

export function assertCreateAuthorDTO(
  data: unknown,
): asserts data is CreateAuthorDTO {
  assertObject(data);
  assertString(data.name);
}
