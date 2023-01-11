import { css } from "./css";
import { formatCurrency } from "./currency";

export const applicationTitle = "Application";
export const prefix = css.prefix;
export const imagePlaceholder = "https://picsum.photos/500/500";

export const globalProperties = {
  $applicationTitle: applicationTitle,
  $prefix: prefix,
  $imagePlaceholder: imagePlaceholder,
  $log: console.log,
  $formatCurrency: formatCurrency,
};

// Type definitions for global properties
type GlobalProperties = typeof globalProperties;
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties extends GlobalProperties {}
}
