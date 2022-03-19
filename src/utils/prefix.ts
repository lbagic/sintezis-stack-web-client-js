import { useCssVar } from "@vueuse/core";

export const prefix = useCssVar("--prefix").value.trim();
