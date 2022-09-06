/**
 * @typedef { <T>(obj: T) => Readonly<{ [K in keyof T as T[K]]: K }> } InvertEnum
 * @typedef { <T>(obj: T) => {
 *    enum: T,
 *    inverted: Readonly<{ [K in keyof T as T[K]]: K }>
 *    messages: Readonly<{ [K in keyof T]: string }>
 * }} CreateEnum
 **/

/** @type { InvertEnum } */
export function invertEnum(obj) {
  return Object.freeze(
    Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [value, parseInt(key)])
    )
  );
}

/** @type { CreateEnum } */
export function createEnum(obj) {
  const inverted = invertEnum(obj);
  return {
    enum: obj,
    inverted: inverted,
    messages: inverted,
  };
}
