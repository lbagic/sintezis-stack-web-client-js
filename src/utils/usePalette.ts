import { colors, type ColorName } from "./useCss";

export type PaletteColor = ColorName;
export type PaletteVariant = "light" | "dark";

export const usePalette = (
  options: { color?: PaletteColor; variant?: PaletteVariant } = {
    color: "primary",
    variant: "dark",
  }
) => {
  const color = options.color ?? "primary";
  const variant = options.variant ?? "dark";

  const pickedColor = colors[color];
  const { base, contrast, opaque } = pickedColor;

  return {
    base,
    strong: pickedColor[variant],
    stronger: pickedColor[`${variant}er`],
    contrast,
    opaque,
  };
};
