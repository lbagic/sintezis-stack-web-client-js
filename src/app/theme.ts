import { css, type CSS } from "@/utils/css";
import type { GlobalThemeOverrides } from "naive-ui";

type NThemeColors = "primary" | "info" | "success" | "warning" | "error";

export const generateThemeColor = <T extends NThemeColors>(
  name: T,
  paletteColor: CSS.PaletteColor
) => ({
  [`${name}Color`]: paletteColor.base,
  [`${name}ColorHover`]: paletteColor["light-2"],
  [`${name}ColorPressed`]: paletteColor.dark,
  [`${name}ColorSuppl`]: paletteColor["light-2"],
});

export const theme: GlobalThemeOverrides = {
  common: {
    baseColor: css.baseColor.background,
    textColorBase: css.baseColor.text,
    ...generateThemeColor("primary", css.color.primary),
    ...generateThemeColor("info", css.color.info),
    ...generateThemeColor("success", css.color.success),
    ...generateThemeColor("warning", css.color.warning),
    ...generateThemeColor("error", css.color.error),
  },
  Divider: {
    color: css.color.muted.base,
  },
  LoadingBar: {
    colorLoading: css.color.success.base,
  },
};
