import { css } from "@/utils/css";
import type { GlobalThemeOverrides } from "naive-ui";

export const theme: GlobalThemeOverrides = {
  common: {
    baseColor: css.baseColors.background,
    textColorBase: css.baseColors.text,

    primaryColor: css.colors.primary.base,
    primaryColorHover: css.colors.primary.light2,
    primaryColorPressed: css.colors.primary.dark,
    primaryColorSuppl: css.colors.primary.light2,

    infoColor: css.colors.info.base,
    infoColorHover: css.colors.info.light2,
    infoColorPressed: css.colors.info.dark,
    infoColorSuppl: css.colors.info.light2,

    successColor: css.colors.success.base,
    successColorHover: css.colors.success.light2,
    successColorPressed: css.colors.success.dark,
    successColorSuppl: css.colors.success.light2,

    warningColor: css.colors.warning.base,
    warningColorHover: css.colors.warning.light2,
    warningColorPressed: css.colors.warning.dark,
    warningColorSuppl: css.colors.warning.light2,

    errorColor: css.colors.error.base,
    errorColorHover: css.colors.error.light2,
    errorColorPressed: css.colors.error.dark,
    errorColorSuppl: css.colors.error.light2,
  },
  Divider: {
    color: css.colors.muted.base,
  },
};
