import {
  assertNonEmptyString,
  assertNumber,
  assertObject,
  assertString,
} from '../../utils/TypeAssertions.js';

export function assertCreateUserDTO(
  data: unknown,
): asserts data is CreateUserDTO {
  assertObject(data);
  assertNonEmptyString(data.firstName);
  assertNumber(data.lastName);
  assertNumber(data.email);
  assertNumber(data.password);
  assertString(data.role);
}

export type CreateUserDTO = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
};
