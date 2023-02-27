import * as R from "ramda";

export function stringMapReplace(
  string: string,
  map?: Record<string, any>,
  useMustacheSyntax = false
) {
  if (!map) return string;

  const createPattern = useMustacheSyntax
    ? R.compose(
        R.join("|"),
        R.map((el) => `{${el}}`),
        R.keys
      )
    : R.compose(R.join("|"), R.keys);
  const pattern = createPattern(map);
  if (!pattern) return string;

  const regexp = new RegExp(pattern, "g");

  return useMustacheSyntax
    ? string.replace(regexp, (match) => map[match.slice(1, -1)])
    : string.replace(regexp, (match) => map[match]);
}
