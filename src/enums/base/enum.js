const isNumeric = (str) => /^\d+$/.test(str);

/**
 * @type { <T>(obj: T) => {
 *    enum: T,
 *    flip: Readonly<{ [K in keyof T as T[K]]: K }>
 *    keys: Readonly<Array<keyof T>>,
 *    messages: Readonly<{ [K in keyof T]: string }>
 *    values: Readonly<Array<T[keyof T]>>,
 * }}
 */
export function createEnum(obj) {
  const allKeys = Object.keys(obj);
  const stringKeys = allKeys.filter((key) => !isNumeric(key));

  const enumKeys = stringKeys.length ? stringKeys : allKeys;
  const enumObj = Object.fromEntries(enumKeys.map((key) => [key, obj[key]]));
  const enumFlip = Object.fromEntries(enumKeys.map((key) => [obj[key], key]));
  const enumValues = Object.values(enumObj);

  return Object.freeze({
    enum: Object.freeze(enumObj),
    flip: Object.freeze(enumFlip),
    keys: Object.freeze(enumKeys),
    values: Object.freeze(enumValues),
    messages: enumObj,
  });
}
