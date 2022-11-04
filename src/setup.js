import "./app/setup";

import { i18nPlugin } from "./app/plugins/i18n";
import { router } from "./app/router.js";
import { pinia } from "./app/store.js";

/**
 * Application setup file.
 *
 * @param { import("vue").App<Element> } app Vue app.
 */

export function setup(app) {
  // Global properties; IMPORTANT - register in setup.d.ts
  app.config.globalProperties.$image = "https://picsum.photos/500/500";

  // Plugins
  app.use(pinia);
  app.use(router);
  app.use(i18nPlugin);
}

export const appName = "Application";
