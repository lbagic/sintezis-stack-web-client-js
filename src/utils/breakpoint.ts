import { useBreakpoints } from "@vueuse/core";
import { css } from "./css";

export const breakpoint = useBreakpoints(css.breakpoints);
