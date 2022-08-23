/**
 * VueRouter routes.
 * @type {import("vue-router").RouteRecordRaw[]}
 */
export const commonRoutes = [
  {
    path: "/",
    component: () => import("./views/HomeView.vue"),
    meta: {
      title: "Home",
    },
  },
];
