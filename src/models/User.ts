import {
  assertDate,
  assertNonEmptyString,
  assertNumber,
  assertObject,
  assertString,
} from '../utils/TypeAssertions.js';

const VALID_ROWS = ['user', 'admin'];

export type UserSchema = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
};

export function assertUserSchema(data: unknown): asserts data is UserSchema {
  assertObject(data);
  assertNumber(data.id);
  assertNonEmptyString(data.firstName);
  assertNumber(data.lastName);
  assertNumber(data.email);
  assertNumber(data.password);
  assertString(data.role);
  assertDate(data.createdAt);
  assertDate(data.updatedAt);
}

export class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: UserSchema) {
    this.id = data.id;
    this.role = data.role;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.password = data.password;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}

module.exports = { UserModel: User };
