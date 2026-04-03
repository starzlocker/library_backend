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
  assertNonEmptyString(data.lastName);
  assertNonEmptyString(data.cpf);
  assertNonEmptyString(data.email);
  assertNonEmptyString(data.password);
  assertString(data.role);
}

export type UpdateUserDTO = {
  id: number;
  firstName: string;
  lastName: string;
  cpf: number;
  email: string;
  password: string;
  role: string;
};
