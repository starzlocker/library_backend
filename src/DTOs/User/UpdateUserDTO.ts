import {
  assertNonEmptyString,
  assertNumber,
  assertObject,
  assertString,
} from '../../utils/TypeAssertions.js';

export function assertUpdateUserDTO(
  data: unknown,
): asserts data is UpdateUserDTO {
  assertObject(data);
  assertNumber(data.id);
  assertNonEmptyString(data.firstName);
  assertNumber(data.lastName);
  assertNumber(data.email);
  assertNumber(data.password);
  assertString(data.role);
}

export type UpdateUserDTO = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
};
