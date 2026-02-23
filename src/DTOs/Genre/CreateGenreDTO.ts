import {
  assertObject,
  assertString,
} from '../../utils/TypeAssertions.js';

export interface CreateGenreDTO {
  name: string;
}

export function assertCreateGenreDTO(
  data: unknown,
): asserts data is CreateGenreDTO {
  assertObject(data);
  assertString(data.name);
}
