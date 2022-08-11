export {}

declare global {
  interface ObjectConstructor {
    /**
     * Returns an object created by key-value entries returned from callback.
     */
    mapEntries<T = any, U = [keyof T, T[keyof T]]>(o: T, callbackfn: (value: U, index: number, array: U[]) => U): T;
   }
}