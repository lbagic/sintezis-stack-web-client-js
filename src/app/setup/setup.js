import "@/app/init";
import { i18nPlugin } from "@/app/plugins/i18n";
import { router } from "@/app/router";
import { setup as adminSetup } from "@/app/setup/setup.admin";
import { setup as clientSetup } from "@/app/setup/setup.client";
import { pinia } from "@/app/store";
import { globalProperties } from "@/globals";

/** @param { import("vue").App<Element> } app */
export function setup(app) {
  Object.assign(app.config.globalProperties, globalProperties);

  app.use(pinia);
  app.use(router);
  app.use(i18nPlugin);

  if (import.meta.env.VITE_ADMIN_PANEL) adminSetup(app);
  else clientSetup(app);
}

export const applicationName = "Application";
