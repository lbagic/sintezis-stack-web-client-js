import "./polyfills";
import { router } from "./router/router.js";
import { pinia } from "./stores/base/store.js";

/**
 * Application setup file.
 *
 * @param { import("vue").App<Element> } app Vue app.
 */

export function setup(app) {
  app.use(pinia);
  app.use(router);
}
