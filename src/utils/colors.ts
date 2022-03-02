import { useCssVar } from "@vueuse/core";

export type PaletteColors = typeof paletteColors[number];
export type PaletteVariants = typeof paletteVariants[number];

const prefix = useCssVar("--design-system-prefix").value.trim();
export const paletteVariants = ["light", "lighter", "dark", "darker"] as const;
export const paletteColors = [
  "primary",
  "accent",
  "secondary",
  "light",
  "dark",
] as const;

export const palettePicker = (
  color: PaletteColors,
  variant: PaletteVariants = "dark"
) => ({
  text: useCssVar(`--${prefix}-${color}-text`),
  color: useCssVar(`--${prefix}-${color}`),
  strong: useCssVar(`--${prefix}-${color}-${variant}`),
  stronger: useCssVar(`--${prefix}-${color}-${variant}er`),
  fade: useCssVar(`--${prefix}-${color}-fade`),
});
