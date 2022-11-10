/**
 * @type { <T>(obj: T) => { [K in keyof T as T[K]]: K } }
 */
export const flipObject = (obj) =>
  Object.fromEntries(Object.entries(obj).map(([key, value]) => [value, key]));
