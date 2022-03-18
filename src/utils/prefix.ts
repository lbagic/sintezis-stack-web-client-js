import { useCssVar } from "@vueuse/core";

export const prefix = useCssVar("--system-prefix").value.trim();
