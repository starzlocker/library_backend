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
  assertNonEmptyString(data.cpf);
  assertNonEmptyString(data.lastName);
  assertNonEmptyString(data.email);
  assertNonEmptyString(data.password);
  assertString(data.role);
}

export type CreateUserDTO = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  cpf: string;
  role: string;
};
