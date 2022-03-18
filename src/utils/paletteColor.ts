import { useCssVar } from "@vueuse/core";
import type { Ref } from "vue";
import { prefix } from "./prefix";

type ColorVariant = "light" | "lighter" | "dark" | "darker";
type ColorName =
  | "primary"
  | "accent"
  | "secondary"
  | "success"
  | "error"
  | "light"
  | "dark"
  | "black"
  | "white";

export type PaletteColor = Record<
  "base" | "strong" | "stronger" | "text" | "fade",
  Ref<string>
>;

export const paletteColor = (
  color: ColorName,
  variant: ColorVariant = "dark"
): PaletteColor => ({
  base: useCssVar(`--${prefix}-${color}`),
  strong: useCssVar(`--${prefix}-${color}-${variant}`),
  stronger: useCssVar(`--${prefix}-${color}-${variant}er`),
  text: useCssVar(`--${prefix}-${color}-text`),
  fade: useCssVar(`--${prefix}-${color}-fade`),
});
