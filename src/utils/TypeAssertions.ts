export function assertString(val: unknown): asserts val is string {
  if (typeof val !== 'string') {
    throw TypeError('Expected val of type string');
  }
}

export function assertNumber(val: unknown): asserts val is number {
  if (typeof val !== 'number') {
    throw TypeError('Expected val of type string');
  }
}

export function assertDefined<T>(val: T): asserts val is NonNullable<T> {
  if (val === undefined || val === null) {
    throw new TypeError(`Expected 'val' to be defined, but received ${val}`);
  }
}

export function assertArray<T>(val: unknown): asserts val is Array<T> {
  if (!Array.isArray(val)) {
    throw new TypeError(`Expected 'val' to be an array`);
  }
}

export function assertObject(
  data: unknown,
): asserts data is Record<string, unknown> {
  if (data === null || typeof data !== 'object') {
    throw new TypeError('Invalid data format. Expected object');
  }
}

export function assertNonNullable<T>(
  data: unknown,
): asserts data is NonNullable<T> {
  if (data === null || data === undefined) {
    throw new TypeError('Data is null or undefined');
  }
}

export function assertNonEmptyString(data: unknown): asserts data is string {
  if (typeof data !== 'string' || data.trim().length === 0)
    throw new TypeError('Data should be a non empty string');
}

export function assertDate(data: unknown): asserts data is Date {
  if (!(data instanceof Date) || Number.isNaN(new Date(data)))
    throw new TypeError('Expected data to be of type Date');
}

export function isNonNullable(
  data: unknown,
) {
  return data !== null && data !== undefined
}
