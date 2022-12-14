import { UnwrapCtor } from '@/utils/types'

type TableColumns<T> = {
  label: string,
  field: keyof T | ((item: Partial<T>) => any),
  search?: boolean,
  sort?: boolean
}

export type TableColumnsFactory<Schema = any> = <
  U extends Schema,
  T extends TableColumns<UnwrapCtor<U>>[]
>(columns: T, schema?: U) => T
