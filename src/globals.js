import { useCssVar } from "@vueuse/core";

export const appName = "Application";
export const prefix = useCssVar("--prefix").value;
export const imagePlaceholder = "https://picsum.photos/500/500";

export const globalProperties = {
  $appName: appName,
  $prefix: prefix,
  $imagePlaceholder: imagePlaceholder,
  $log: console.log,
};
