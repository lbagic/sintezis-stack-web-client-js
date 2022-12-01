// @ts-check
import { routes as clientRoutes } from "@/routes/routes.client";
import { routes as adminRoutes } from "@/routes/routes.admin";

/** @type { import("vue-router").RouteRecordRaw[] } */
export const routes = import.meta.env.VITE_ADMIN_PANEL
  ? adminRoutes
  : clientRoutes;
