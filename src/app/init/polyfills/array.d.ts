type Item = Record<string, unknown>;
type Identifier<T, Value = string | number | boolean> = keyof {
  [P in keyof T as T[P] extends Value ? P : never]: T[P];
};

declare global {
  interface Array<T> {
    add<U extends T>(item: U, identifier?: Identifier<U>): U[];
    add<U extends T>(items: U[], identifier?: Identifier<U>): U[];
    remove<U extends T>(id: U[Identifier<U>], identifier?: Identifier<U>): U[];
    remove<U extends T>(
      ids: U[Identifier<U>][],
      identifier?: Identifier<U>
    ): U[];
    remove<U extends T>(item: Partial<U>): U[];
    remove<U extends T>(items: Partial<U>[]): U[];
    findOne<U extends T>(
      id: U[Identifier<U>],
      identifier?: Identifier<U>
    ): U | undefined;
    findOne<U extends T>(item: Partial<U>): U | undefined;
    findMany<U extends T>(
      id: U[Identifier<U>],
      identifier?: Identifier<U>
    ): U[];
    findMany<U extends T>(
      ids: U[Identifier<U>][],
      identifier?: Identifier<U>
    ): U[];
    findMany<U extends T>(item: Partial<U>): U[];
    findMany<U extends T>(items: Partial<U>[]): U[];
  }
}

export {};
