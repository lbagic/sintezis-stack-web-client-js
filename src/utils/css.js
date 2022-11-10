import rawCSS from "@/assets/styles/export.module.scss";

const parseJson = (str) => JSON.parse(str.slice(1, str.length - 1));
const parsed = parseJson(rawCSS.JSON);

/**
 * Breakpoint defintions
 * @typedef {{
 *  s: number
 *  m: number
 *  l: number
 *  xl: number
 *  xxl: number
 * }} Breakpoints
 * /

/**
 * Color definitions
 * @typedef { "primary" | "secondary" | "success" | "info" | "warning" | "danger" | "light" | "grey" | "dark"  } ColorNames
 * @typedef { "base" | "contrast" | "opaque" | "light" | "lighter" | "lightest" | "max-light" | "dark" | "darker" | "darkest" | "max-dark" } ColorVariants
 * @typedef { "text" | "background" } SolidColorNames
 * 
 * @typedef { Record<ColorNames, ColorVariants> } PaletteColors
 * @typedef { Record<SolidColorNames, string> } SolidColors
 */

/** 
 * z-index defintions
 * @typedef {{
 *  toast: number
 *  modal: number
 * }} ZIndex
 * /
 
/**
 * @type {{
 *  prefixRaw: string
 *  prefix: string
 *  colors: PaletteColors
 *  solidColors: SolidColors
 *  zIndex: number
 *  breakpoints: Breakpoints
 * }}
 */
export const css = {
  prefixRaw: parsed.prefix,
  prefix: parsed.prefix.replace(/[^\w\s]/gi, ""),
  colors: parsed.colors,
  solidColors: parsed.solidColors,
  zIndex: parsed.zIndex,
  breakpoints: Object.fromEntries(
    Object.entries(parsed.breakpoints).map(([k, v]) => [k, parseInt(v)])
  ),
};
