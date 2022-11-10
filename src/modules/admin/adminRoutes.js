/** @type { import("vue-router").RouteRecordRaw[] } */
export const adminRoutes = [
  {
    path: "/",
    component: () => import("./views/AdminIndexView.vue"),
    children: [
      {
        path: "",
        component: () => import("./views/AdminDashboardView.vue"),
        meta: {
          title: "Dashboard",
        },
      },
    ],
  },
];
