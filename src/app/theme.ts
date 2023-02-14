import { css } from "@/utils/css";
import type { GlobalThemeOverrides } from "naive-ui";

export const theme: GlobalThemeOverrides = {
  common: {
    baseColor: css.baseColor.background,
    textColorBase: css.baseColor.text,
    primaryColor: css.color.primary.base,
    primaryColorHover: css.color.primary["light-2"],
    primaryColorPressed: css.color.primary.dark,
    primaryColorSuppl: css.color.primary["light-2"],
    infoColor: css.color.info.base,
    infoColorHover: css.color.info["light-2"],
    infoColorPressed: css.color.info.dark,
    infoColorSuppl: css.color.info["light-2"],
    successColor: css.color.success.base,
    successColorHover: css.color.success["light-2"],
    successColorPressed: css.color.success.dark,
    successColorSuppl: css.color.success["light-2"],
    warningColor: css.color.warning.base,
    warningColorHover: css.color.warning["light-2"],
    warningColorPressed: css.color.warning.dark,
    warningColorSuppl: css.color.warning["light-2"],
    errorColor: css.color.error.base,
    errorColorHover: css.color.error["light-2"],
    errorColorPressed: css.color.error.dark,
    errorColorSuppl: css.color.error["light-2"],
  },
  Divider: {
    color: css.color.muted.base,
  },
  LoadingBar: {
    colorLoading: css.color.success.base,
  },
};
