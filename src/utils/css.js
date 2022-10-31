import rawCSS from "@/assets/styles/export.module.scss";

const parseJson = (str) => JSON.parse(str.slice(1, str.length - 1));
const parsed = parseJson(rawCSS.JSON);

/**
 * Breakpoint defintions
 * @typedef {{
 *  s: number,
 *  m: number,
 *  l: number,
 *  xl: number,
 *  xxl: number,
 * }} Breakpoints
 * /

/**
 * Color definitions
 * @typedef {{
 *  base: string,
 *  contrast: string,
 *  opaque: string,
 *  light: string,
 *  lighter: string,
 *  lightest: string,
 *  dark: string,
 *  darker: string,
 *  darkest: string
 * }} Color
 * 
 * @typedef {{
 *  text: string,
 *  background: string
 *  primary: Color,
 *  secondary: Color,
 *  success: Color,
 *  info: Color,
 *  warning: Color,
 *  danger: Color,
 *  light: Color,
 *  grey: Color,
 *  dark: Color
 * }} Colors
 */

/** 
 * z-index defintions
 * @typedef {{
 *  toast: number,
 *  modal: number,
 * }} ZIndex
 * /
 
/**
 * @type {{
 *  breakpoints: Breakpoints,
 *  colors: Colors,
 *  prefix: string,
 *  prefixRaw: string,
 * }}
 */

export const css = {
  prefixRaw: parsed.prefix,
  prefix: parsed.prefix.replace(/[^\w\s]/gi, ""),
  colors: parsed.colors,
  zIndex: parsed.zIndex,
  breakpoints: Object.fromEntries(
    Object.entries(parsed.breakpoints).map(([k, v]) => [k, parseInt(v)])
  ),
};
