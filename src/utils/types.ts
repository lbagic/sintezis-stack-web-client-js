export type Ctor = new () => any
// export type Instance<T> = T extends Ctor ? InstanceType<T> : T
export type Instance<T> = T extends Ctor ? InstanceType<T> : T
export type OmitType<T extends Record<PropertyKey, any>, U> = Omit<T, { [K in keyof T]: T[K] extends U ? K : never }[keyof T]>
export type SubPartial<T, Schema> = Partial<Schema> & { [K in keyof T]: K extends keyof Schema ? Schema[K] : never }
export type UnwrapCtor<T> = Instance<T> extends Record<PropertyKey, any> ? OmitType<Instance<T>, Function> : T
