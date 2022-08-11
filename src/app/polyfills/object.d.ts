export {}

declare global {
  interface ObjectConstructor {
    /**
     * Returns an object created by key-value entries returned from callback. Shorthand for Object.fromEntries(Object.entries(o).map(fn)).
     */
    mapEntries<T = any, U = [keyof T, T[keyof T]]>(o: T, callbackfn: (value: U, index: number, array: U[]) => U): T;
   }
}