import { useCssVar } from "@vueuse/core";
import type { Ref } from "vue";
import { prefix } from "./prefix";

export type PaletteVariant = "light" | "dark";
export type PaletteColor =
  | "primary"
  | "accent"
  | "secondary"
  | "success"
  | "error"
  | "light"
  | "dark"
  | "black"
  | "white";

export type Palette = Record<
  "base" | "strong" | "stronger" | "text" | "fade",
  Ref<string>
>;

export const colorPalette = (
  color: PaletteColor,
  variant: PaletteVariant = "dark"
): Palette => ({
  base: useCssVar(`--${prefix}-${color}`),
  strong: useCssVar(`--${prefix}-${color}-${variant}`),
  stronger: useCssVar(`--${prefix}-${color}-${variant}er`),
  text: useCssVar(`--${prefix}-${color}-text`),
  fade: useCssVar(`--${prefix}-${color}-fade`),
});
