// based on "pinia": "^2.0.11"
//
// replaces "defineStore" with "createStore" which generates type safe actions based on state
//
// generates the following actions:
// "resetProperty" for any root level property
// "addProperty", "removeProperty", "findProperty", "findAllProperty" for any root level array properties

import {
  defineStore,
  type DefineStoreOptions,
  type StateTree,
  type StoreDefinition,
  type _GettersTree,
} from "pinia";

type Identifier = string | number | symbol;
type Identifiable = { id: Identifier; [key: Identifier]: unknown };
type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;
type PickArrayKeys<T> = Pick<
  T,
  {
    [K in keyof T]: T[K] extends unknown[] ? K : never;
  }[keyof T]
>;

type GenerateActions<T, S> = T & {
  [K in keyof S as `${string & K}Reset`]: () => S[K];
} & {
  [K in keyof PickArrayKeys<S> as `${string & K}Add`]: (
    item: ArrayElement<S[K]> | S[K]
  ) => S[K];
} & {
  [K in keyof PickArrayKeys<S> as `${string & K}Remove`]: (
    search: Identifier | Identifier[] | Partial<ArrayElement<S[K]>>
  ) => S[K];
} & {
  [K in keyof PickArrayKeys<S> as `${string & K}FindOne`]: (
    search: Identifier | Identifier[] | Partial<ArrayElement<S[K]>>
  ) => ArrayElement<S[K]> | undefined;
} & {
  [K in keyof PickArrayKeys<S> as `${string & K}FindMany`]: (
    search: Identifier | Identifier[] | Partial<ArrayElement<S[K]>>
  ) => S[K];
};
type ActionType<T, S> = T & ThisType<GenerateActions<T, S> & S>;

const isPrimitive = (value: unknown) =>
  value === null ||
  value === undefined ||
  typeof value === "string" ||
  typeof value === "number" ||
  typeof value === "boolean";

export const generateStore = <
  Id extends string,
  // eslint-disable-next-line @typescript-eslint/ban-types
  S extends StateTree = {},
  // eslint-disable-next-line @typescript-eslint/ban-types
  G extends _GettersTree<S> = {},
  // eslint-disable-next-line @typescript-eslint/ban-types
  A = {}
>(
  store: DefineStoreOptions<Id, S, G, ActionType<A, S>>
): StoreDefinition<Id, S, G, GenerateActions<A, S>> => {
  const generatedActions = Object.entries(store.state?.() ?? []).reduce(
    (a: Record<Identifier, unknown>, [key, value]) => {
      /**
       * Reset method; applied to every root level state
       */
      a[`${key}Reset`] = function () {
        this[key] = store.state?.()[key];
        return this[key];
      };
      if (Array.isArray(value)) {
        /**
         * Collection add method; adds unique elements to collection based on "id"
         */
        a[`${key}Add`] = function (
          this: { [key: Identifier]: Identifiable[] },
          item: Identifiable | Identifiable[]
        ) {
          const items = Array.isArray(item) ? item : [item];
          const array = this[key];
          items.forEach((newItem) => {
            const existingIndex = array.findIndex(
              (savedItem) => savedItem.id === newItem.id
            );
            if (existingIndex >= 0) array.splice(existingIndex, 1, newItem);
            else array.push(newItem);
          });
          return this[key];
        };
        /**
         * Collection remove method; removes elements from collection
         */
        a[`${key}Remove`] = function (
          this: { [key: Identifier]: Identifiable[] },
          search: Identifier | Identifier[] | Identifiable
        ) {
          if (isPrimitive(search)) {
            this[key] = this[key].filter((el) => el.id !== search);
          } else if (Array.isArray(search)) {
            this[key] = this[key].filter((el) => !search.includes(el.id));
          } else if (typeof search === "object") {
            const searchEntries = Object.entries(search);
            this[key] = this[key].filter(
              (el) => !searchEntries.every(([key, value]) => el[key] === value)
            );
          }
          return this[key];
        };
        /**
         * Collection find method; searches for specific element in collection
         */
        a[`${key}FindOne`] = function (
          this: { [key: Identifier]: Identifiable[] },
          search: Identifier | Identifier[] | Identifiable
        ) {
          if (isPrimitive(search)) {
            return this[key].find((el) => el.id === search);
          } else if (Array.isArray(search)) {
            return this[key].find((el) => search.includes(el.id));
          } else if (typeof search === "object") {
            const searchEntries = Object.entries(search);
            return this[key].find((el) =>
              searchEntries.every(([key, value]) => el[key] === value)
            );
          }
          return undefined;
        };
        /**
         * Collection findMany method; searches for specific elements in collection
         */
        a[`${key}FindMany`] = function (
          this: { [key: Identifier]: Identifiable[] },
          search: Identifier | Identifier[] | Identifiable
        ) {
          if (isPrimitive(search)) {
            return this[key].filter((el) => el.id === search);
          } else if (Array.isArray(search)) {
            return this[key].filter((el) => search.includes(el.id));
          } else if (typeof search === "object") {
            const searchEntries = Object.entries(search);
            return this[key].filter((el) =>
              searchEntries.every(([key, value]) => el[key] === value)
            );
          }
          return [];
        };
      }
      return a;
    },
    {}
  ) as GenerateActions<A, S>;

  store.actions = { ...store.actions, ...generatedActions };

  return defineStore(
    store as unknown as DefineStoreOptions<Id, S, G, GenerateActions<A, S>>
  );
};
