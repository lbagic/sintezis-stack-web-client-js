import type { RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
  {
    path: "/test",
    component: () => import("@/views/dev/TestView.vue"),
    meta: { title: "Test" },
  },
  {
    path: "/test-inputs",
    component: () => import("@/views/dev/TestInputsView.vue"),
    meta: { title: "Test Inputs" },
  },
];
