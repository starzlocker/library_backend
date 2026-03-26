import { assertNumber, assertObject } from '../../utils/TypeAssertions.js';

export function assertDeleteUserDTO(
  data: unknown,
): asserts data is DeleteUserDTO {
  assertObject(data);
  assertNumber(data.id);
}

export type DeleteUserDTO = {
  id: number;
};
