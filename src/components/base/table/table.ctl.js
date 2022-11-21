/** @typedef {new () => object} Ctor */

/**
 * @template { Record<string, any> } T
 * @typedef { Array<{
 *  label: string,
 *  field: keyof T | (object: T) => any,
 *  search: boolean,
 *  sort: boolean | 'asc' | 'desc',
 * }> } TableColumns
 */

/**
 * @template T
 * @typedef {{
 *  schema: T,
 *  columns: TableColumns<T extends Ctor ? InstanceType<T> : T>,
 * }} TableConfig
 */

/**
 * @type { <T>(config: TableConfig<T>) => config }
 */
export function createTable(config) {
  return config;
}
