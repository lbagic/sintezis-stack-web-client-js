import rawCSS from "@/assets/styles/export.module.scss";
import { mapObjIndexed } from "ramda";

export namespace CSS {
  export type Breakpoints = "s" | "m" | "l" | "xl" | "xxl";
  export type Containers = "s" | "m" | "l" | "xl" | "expand";
  export type PaletteColors =
    | "black"
    | "error"
    | "dark"
    | "grey"
    | "info"
    | "light"
    | "muted"
    | "primary"
    | "accent"
    | "success"
    | "warning"
    | "white";
  export type PaletteVariants =
    | "dark"
    | "dark-2"
    | "darker"
    | "darker-2"
    | "darkest"
    | "darkest-2"
    | "light"
    | "light-2"
    | "lighter"
    | "lighter-2"
    | "lightest"
    | "lightest-2"
    | "opaque"
    | "opaque-soft"
    | "soft";
  export type baseColors = "text" | "background";
  export type ZIndexes = "toast" | "modal";
  export type Parsed = {
    breakpoints: Record<CSS.Breakpoints, string>;
    colors: Record<
      CSS.PaletteColors,
      {
        base: string;
        contrast: string;
      } & {
        [K in CSS.PaletteVariants]: string;
      } & {
        [K in CSS.PaletteVariants as `${K & string}-contrast`]: string;
      }
    >;
    containers: Record<CSS.Containers, string>;
    prefix: string;
    baseColors: Record<CSS.baseColors, string>;
    zIndex: Record<CSS.ZIndexes, number>;
  };
}

const parsed: CSS.Parsed = JSON.parse(rawCSS.JSON.slice(1, -1));

export const css = {
  prefix: parsed.prefix,
  colors: parsed.colors,
  baseColors: parsed.baseColors,
  zIndex: parsed.zIndex,
  breakpoints: mapObjIndexed((value) => parseInt(value), parsed.breakpoints),
} as const;

const paletteColorNames = Object.keys(css.colors);
export function isColorName(name: string) {
  return paletteColorNames.includes(name);
}
