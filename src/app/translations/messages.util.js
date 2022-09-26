/**
 * i18n message enum factory.
 *
 * @template T
 * @param { T } messages Messages available for i18n.
 * @param { string | undefined } parent Messages available for i18n.
 * @returns { T } Returns enums usable with $t.
 */

export function createMessageEnums(messages, parent = undefined) {
  const entries = Object.entries(messages);
  /** @type { any } */
  const output = Object.fromEntries(
    entries.map(([key, value]) => {
      const path = parent ? `${parent}.${key}` : key;
      if (typeof value === "object")
        return [key, createMessageEnums(value, path)];
      return [key, path];
    })
  );
  return output;
}
