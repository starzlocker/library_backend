import {
  assertNonEmptyString,
  assertObject,
  assertString,
} from '../../utils/TypeAssertions.js';

export function assertCreateUserDTO(
  data: unknown,
): asserts data is CreateUserDTO {
  assertObject(data);
  assertNonEmptyString(data.firstName, 'firstName');
  assertNonEmptyString(data.cpf, 'cpf');
  assertNonEmptyString(data.lastName, 'lastName');
  assertNonEmptyString(data.email, 'email');
  assertNonEmptyString(data.password, 'password');
  if ('role' in data) assertString(data.role, 'role');
}

export type CreateUserDTO = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  cpf: string;
  role: string;
};
