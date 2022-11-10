/** @type { import("vue-router").RouteRecordRaw[] } */
export const testRoutes = [
  {
    path: "/test",
    component: () => import("./views/TestView.vue"),
    meta: {
      title: "test",
    },
  },
];
