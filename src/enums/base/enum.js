import { flipObject } from "../../utils/object";

/**
 * @type { <T>(obj: T) => {
 *    enum: T,
 *    flip: Readonly<{ [K in keyof T as T[K]]: K }>
 *    keys: Readonly<Array<keyof T>>,
 *    messages: Readonly<{ [K in keyof T]: string }>
 *    values: Readonly<Array<T[keyof T]>>,
 * }}
 * */
export function createEnum(obj) {
  return Object.freeze({
    enum: obj,
    flip: Object.freeze(flipObject(obj)),
    keys: Object.freeze(Object.keys(obj)),
    values: Object.freeze(Object.values(obj)),
    messages: obj,
  });
}
