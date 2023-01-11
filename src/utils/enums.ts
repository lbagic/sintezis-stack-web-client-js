import * as R from "ramda";
import { readonly } from "vue";

export function createEnum<T extends Record<PropertyKey, any>>(object: T) {
  return readonly({
    enum: object,
    invert: R.invertObj(object) as { [K in keyof T as T[K]]: K },
    keys: R.keys(object),
    values: R.values(object),
    messages: object as Record<keyof T, string>,
  });
}
