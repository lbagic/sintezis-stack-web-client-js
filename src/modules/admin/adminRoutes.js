import { authRoutes } from "../auth/authRoutes";

/** @type { import("vue-router").RouteRecordRaw[] } */
export const adminRoutes = [
  ...authRoutes,
  {
    path: "/",
    component: () => import("./views/IndexView.vue"),
    children: [
      {
        path: "",
        component: () => import("./views/DashboardView.vue"),
        meta: {
          title: "Dashboard",
        },
      },
    ],
  },
];
