import "@/app/init";
import { router } from "@/app/router";
import { setupApp as setupAdminApp } from "@/app/setup/admin/setup";
import { setupApp as setupClientApp } from "@/app/setup/client/setup";
import { pinia } from "@/app/store";
import { globalProperties } from "@/utils/globalProperties";
import type { App } from "vue";

export function setupApp(app: App) {
  Object.assign(app.config.globalProperties, globalProperties);

  app.use(pinia);
  app.use(router);

  if (import.meta.env.VITE_ADMIN_PANEL) setupAdminApp(app);
  else setupClientApp(app);
}
