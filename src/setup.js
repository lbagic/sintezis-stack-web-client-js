import { i18nPlugin } from "./app/plugins/i18n";
import "./app/polyfills";
import { router } from "./app/router.js";
import { pinia } from "./app/store.js";

/**
 * Application setup file.
 *
 * @param { import("vue").App<Element> } app Vue app.
 */

export function setup(app) {
  app.config.globalProperties.$image = "https://picsum.photos/500/500";

  app.use(pinia);
  app.use(router);
  app.use(i18nPlugin);
}
