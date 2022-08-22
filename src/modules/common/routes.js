/**
 * VueRouter routes.
 * @type {import("vue-router").RouteRecordRaw[]}
 */
export const commonRoutes = [
  {
    path: "/",
    component: () => import("./views/HomeView.vue"),
    meta: { userOnly: true },
  },
  {
    path: "/test",
    component: () => import("./views/TestView.vue"),
  },
];
