import raw from "@/assets/styles/export.module.scss";
import { mapObjIndexed } from "ramda";

export namespace CSS {
  export type Breakpoints = "s" | "m" | "l" | "xl" | "xxl";
  export type Containers = "s" | "m" | "l" | "xl" | "expand";
  export type Widths = "xs" | "s" | "m" | "l" | "xl";
  export type BorderRadius = "s" | "m" | "l" | "xl" | "round";
  export type BoxShadows = "s" | "m" | "l" | "xl" | "xxl";
  export type Bezier = "1" | "2" | "3" | "4";
  export type BaseColors = "text" | "background";
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
  export type Parsed = {
    prefix: string;
    breakpoint: Record<Breakpoints, string>;
    container: Record<Containers, string>;
    width: Record<Widths, string>;
    bezier: Record<Bezier, string>;
    "border-radius": Record<BorderRadius, string>;
    "box-shadow": Record<BoxShadows, string[][]>;
    "base-color": Record<BaseColors, string>;
    color: Record<
      PaletteColors,
      {
        base: string;
        contrast: string;
      } & {
        [K in PaletteVariants]: string;
      } & {
        [K in PaletteVariants as `${K & string}-contrast`]: string;
      }
    >;
  };
}

const asNumber = (value: string) => parseInt(value);
const asNumberOrString = (value: string) => {
  const parsedValue = parseInt(value);
  return isNaN(parsedValue) ? value : parsedValue;
};

const parsed: CSS.Parsed = JSON.parse(raw.jsonVariables.slice(1, -1));
export const css = {
  prefix: raw.prefix,
  breakpoint: mapObjIndexed(asNumber, parsed.breakpoint),
  container: mapObjIndexed(asNumberOrString, parsed.container),
  width: mapObjIndexed(asNumber, parsed.width),
  bezier: parsed.bezier,
  borderRadius: parsed["border-radius"],
  boxShadow: mapObjIndexed(
    (values) => values.map((el) => el.join(" ")).join(", "),
    parsed["box-shadow"]
  ),
  baseColor: parsed["base-color"],
  color: parsed.color,
};

export function setCssVar(name: string, value: string | null) {
  document.documentElement.style.setProperty(name, value);
}
export function getCssVar(
  name: string,
  element: Element = document.documentElement
) {
  return getComputedStyle(element).getPropertyValue(name).trim();
}
