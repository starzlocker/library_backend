export function assertString(val: unknown, key: string='value'): asserts val is string {
  if (typeof val !== 'string') {
    throw TypeError(`Expected ${key} to be of type string`);
  }
}

export function assertNumber(val: unknown, key: string='value'): asserts val is number {
  if (typeof val !== 'number') {
    throw TypeError(`Expected ${key} to be of type number`);
  }
}

export function assertDefined<T>(val: T, key: string='value'): asserts val is NonNullable<T> {
  if (val === undefined || val === null) {
    throw new TypeError(`Expected ${key} to be defined, but received ${val}`);
  }
}

export function assertArray<T>(val: unknown, key: string='value'): asserts val is Array<T> {
  if (!Array.isArray(val)) {
    throw new TypeError(`Expected ${key} to be an array`);
  }
}

export function assertObject(
  val: unknown,
): asserts val is Record<string, unknown> {
  if (val === null || typeof val !== 'object') {
    throw new TypeError('Invalid data format. Expected object');
  }
}

export function assertNonNullable<T>(
  val: unknown,
): asserts val is NonNullable<T> {
  if (val === null || val === undefined) {
    throw new TypeError('Data is null or undefined');
  }
}

export function assertNonEmptyString(val: unknown, key: string='value'): asserts val is string {
  if (typeof val !== 'string' || val.trim().length === 0)
    throw new TypeError(`${key} should be a non empty string`);
}

export function assertDate(val: unknown, key: string='value'): asserts val is Date {
  if (!(val instanceof Date) || Number.isNaN(new Date(val)))
    throw new TypeError(`Expected ${key} to be of type Date`);
}

export function isNonNullable(
  data: unknown,
) {
  return data !== null && data !== undefined
}
