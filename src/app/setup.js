import "./init";

import { useCssVar } from "@vueuse/core";
import { i18nPlugin } from "./plugins/i18n";
import { router } from "./router/router";
import { setupAdmin } from "./setup.admin";
import { pinia } from "./store/store";

/** @param { import("vue").App<Element> } app */
export function setup(app) {
  // Vue global properties
  // IMPORTANT: register in setup.d.ts
  app.config.globalProperties.$image = "https://picsum.photos/500/500";
  app.config.globalProperties.$prefix = useCssVar("--prefix").value;

  // Vue Plugins
  app.use(pinia);
  app.use(router);
  app.use(i18nPlugin);

  // Run setup file for admin panel
  if (import.meta.env.VITE_ADMIN_PANEL) setupAdmin(app);
}

export const appName = "Application";
