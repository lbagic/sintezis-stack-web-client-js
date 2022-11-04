declare global {
  interface ObjectConstructor {
    /**
     * Calls a defined callback function on each key-value pair of an object, and returns an object that contains the results.
     */
    map<T = any>(o: T, callbackfn: (value: T[keyof T], key: keyof T) => any): Record<keyof T, any>;
    /**
     * Returns the key-value pairs of an object that meet the condition specified in a callback function.
     */
    filter<T = any>(o: T, callbackfn: (value: T[keyof T], key: keyof T) => any): Record<Partial<keyof T>, any>;
    /**
     * Calls the specified callback function for all key-value pairs in an object. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
     */
    reduce<T = any, U = unknown>(o: T, callbackfn: (previousValue: U, value: T[keyof T], key: keyof T) => U, initialValue: U): U;
  }
}

export {}
