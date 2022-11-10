/** @type { import("vue-router").RouteRecordRaw[] } */
export const commonRoutes = [
  {
    path: "/",
    component: () => import("./views/IndexView.vue"),
  },
];
