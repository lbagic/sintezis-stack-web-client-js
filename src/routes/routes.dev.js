// @ts-check

/** @type { import("vue-router").RouteRecordRaw[] } */
export const routes = [
  {
    path: "/test",
    component: () => import("@/views/dev/TestView.vue"),
    meta: { title: "test" },
  },
  {
    path: "/test-inputs",
    component: () => import("@/views/dev/TestInputsView.vue"),
    meta: { title: "test" },
  },
];
