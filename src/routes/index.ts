import { routes as clientRoutes } from "@/routes/client/routes";
import { routes as adminRoutes } from "@/routes/admin/routes";
import { routes as devRoutes } from "@/routes/development/routes";
import type { RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [];

if (import.meta.env.VITE_ADMIN_PANEL) routes.push(...adminRoutes);
if (!import.meta.env.VITE_ADMIN_PANEL) routes.push(...clientRoutes);
if (import.meta.env.DEV) routes.push(...devRoutes);
