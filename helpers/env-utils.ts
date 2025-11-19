/**
 * Returns the value if it exists, otherwise returns the default value
 */
export function fillDefault(value: string | undefined, defaultValue: string): string {
  return !value ? defaultValue : value;
}

/**
 * Returns the value if it exists, otherwise returns undefined
 */
export function optional(value: string | undefined): string | undefined {
  return value ? value : undefined;
}

/**
 * Returns the value if it exists, otherwise throws an error
 */
export function required(value: string | undefined, name: string): string {
  if (!value) {
    throw Error(`The environment variable ${name} is required but not found.`);
  }
  return value;
}
