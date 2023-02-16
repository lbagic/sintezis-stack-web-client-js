import { accountRoutes } from "@/routes/shared/account.routes";
import { developmentRoutes } from "@/routes/shared/development.routes";
import type { RouteRecordRaw } from "vue-router";

export const clientRoutes: RouteRecordRaw[] = [
  ...accountRoutes,
  {
    path: "/",
    component: () => import("@/views/index/IndexView.vue"),
  },
];

if (import.meta.env.DEV) clientRoutes.push(...developmentRoutes);
