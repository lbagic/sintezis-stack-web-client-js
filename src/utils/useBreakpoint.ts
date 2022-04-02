import { useBreakpoints } from "@vueuse/core";
import { breakpoints } from "./useCss";

const breakpointMap = Object.fromEntries(
  Object.entries(breakpoints).map(([k, v]) => [k, parseInt(v)])
);

export const useBreakpoint = useBreakpoints(breakpointMap);
