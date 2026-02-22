export function isString(val:unknown): asserts val is string {
  if (typeof val !== 'string') {
    throw TypeError('Expected val of type string');
  }
}

export function isNumber(val:unknown): asserts val is number {
  if (typeof val !== 'number') {
    throw TypeError('Expected val of type string');
  }
}

export function isDefined<T>(val: T): asserts val is NonNullable<T> {
  if (val === undefined || val === null) {
    throw new TypeError(
      `Expected 'val' to be defined, but received ${val}`
    );
  }
}

export function isArray<T>(val: unknown): asserts val is Array<T> {
  if (!Array.isArray(val)) {
    throw new TypeError(
      `Expected 'val' to be an array`
    )
  }
}