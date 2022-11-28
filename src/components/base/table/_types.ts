import { SubPartial, UnwrapCtor } from '@/utils/types'

type TableColumns<T> = {
  label: any extends infer R ? `${R & string}` : never,
  field: keyof T | ((item: Partial<T>) => any),
  search?: boolean,
  sort?: boolean | 'asc' | 'desc'
}

export type TableColumnsFactory<Schema = any> = <
  U extends Schema,
  T extends any extends infer R ? SubPartial<TableColumns<R>, TableColumns<UnwrapCtor<U>>>[] : never
>(columns: T, schema?: U) => T
