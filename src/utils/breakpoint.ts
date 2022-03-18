import { useBreakpoints } from "@vueuse/core";

export const breakpoint = useBreakpoints({
  s: 640,
  m: 768,
  l: 1024,
  xl: 1280,
  xxl: 1536,
});
