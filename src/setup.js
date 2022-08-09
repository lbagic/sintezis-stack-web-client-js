import "./utils/polyfills";
import { router } from "./router/router.js";
import { pinia } from "./stores/base/store.js";
import { createI18n } from "vue-i18n";
import { translations } from "./utils/translations";

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages: translations,
});

/**
 * Application setup file.
 *
 * @param { import("vue").App<Element> } app Vue app.
 */

export function setup(app) {
  app.use(pinia);
  app.use(router);
  app.use(i18n);
}
