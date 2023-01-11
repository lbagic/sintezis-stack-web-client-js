import * as R from "ramda";

const createPattern = R.compose(
  R.join("|"),
  R.map((el) => `{${el}}`),
  R.keys
);

export function stringMapReplace(
  string: string,
  replaceMap?: Record<PropertyKey, any>
) {
  if (!replaceMap) return string;
  const pattern = createPattern(replaceMap);
  if (!pattern) return string;
  const regexp = new RegExp(pattern, "g");
  return string.replace(regexp, (match) => replaceMap[match.slice(1, -1)]);
}
