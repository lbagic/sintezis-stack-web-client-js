import { adminResources } from "@/modules/admin/adminResources";
import { accountRoutes } from "@/routes/shared/account.routes";
import { developmentRoutes } from "@/routes/shared/development.routes";
import type { RouteRecordRaw } from "vue-router";

export const adminRoutes: RouteRecordRaw[] = [
  ...accountRoutes,
  {
    path: "/",
    component: () => import("@/views/admin/AdminIndexView.vue"),
    meta: {
      title: "Admin Panel",
      authorize: ({ isLoggedIn }) => isLoggedIn,
    },
    children: [
      {
        name: "dashboard",
        path: "",
        component: () => import("@/views/admin/AdminDashboardView.vue"),
        meta: {
          title: "Dashboard",
          breadcrumbs: () => [
            { label: "Dashboard", to: { name: "dashboard" } },
          ],
        },
      },
      {
        name: "resource",
        path: "resource/:resourceId",
        component: () => import("@/views/admin/AdminResourceView.vue"),
        beforeEnter(to, from, next) {
          const id = to.params.resourceId as string;
          return !adminResources[id] ? next("/") : next();
        },
        meta: {
          title: (route) => route.params.resourceId as string,
          breadcrumbs: (route) => [
            { label: "Dashboard", to: { name: "dashboard" } },
            {
              label: route.params.resourceId as string,
              to: { name: "resource" },
            },
          ],
        },
      },
    ],
  },
];

if (import.meta.env.DEV) adminRoutes.push(...developmentRoutes);
