import { useBreakpoints } from "@vueuse/core";
import { css } from "./css";

export const breakpoints = useBreakpoints(css.breakpoints);
