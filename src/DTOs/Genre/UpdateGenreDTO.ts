import {
  assertNumber,
  assertObject,
  assertString,
} from '../../utils/TypeAssertions.js';

export interface UpdateGenreDTO {
  id: number;
  name: string;
}

export function assertUpdateGenreDTO(
  data: unknown,
): asserts data is UpdateGenreDTO {
  assertObject(data);
  assertNumber(data.id);
  assertString(data.name);
}
