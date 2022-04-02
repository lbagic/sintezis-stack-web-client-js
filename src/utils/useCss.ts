import css from "@/assets/styles/export.module.scss";

type MappedType<T extends string, Value = string> = {
  readonly [K in T]: Value;
};

const isJson = (value: unknown) =>
  typeof value === "string" && value.at(0) === `'` && value.at(-1) === `'`;
const parseJson = (value: string) =>
  JSON.parse(value.slice(1, value.length - 1));

// Breakpoint types
export type BreakpointNames = "s" | "m" | "l" | "xl" | "xxl";
type Breakpoints = MappedType<BreakpointNames>;

// Color types
export type ColorName =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "light"
  | "dark";

export type ColorVariant =
  | "base"
  | "light"
  | "lighter"
  | "dark"
  | "darker"
  | "contrast"
  | "opaque";

type Colors = MappedType<ColorName, MappedType<ColorVariant>>;

type CssVariables = {
  prefix: string;
  breakpoints: Breakpoints;
  colors: Colors;
};

// Export css variables to js
export const { prefix, colors, breakpoints } = Object.fromEntries(
  Object.entries(css as Record<string, string>).map(([k, v]) => [
    k,
    isJson(v) ? parseJson(v) : v,
  ])
) as CssVariables;
