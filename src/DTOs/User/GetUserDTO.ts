import { assertNumber, assertObject } from '../../utils/TypeAssertions.js';

export function assertGetUserDTO(data: unknown): asserts data is GetUserDTO {
  assertObject(data);
  assertNumber(data.id);
}

export type GetUserDTO = {
  id: number;
};
