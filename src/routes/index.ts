import { adminRoutes } from "@/routes/admin/routes";
import { clientRoutes } from "@/routes/client/routes";
import type { RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [];

if (import.meta.env.VITE_ADMIN_PANEL) routes.push(...adminRoutes);
if (!import.meta.env.VITE_ADMIN_PANEL) routes.push(...clientRoutes);
