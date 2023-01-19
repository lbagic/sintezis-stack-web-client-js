import type { RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
  {
    path: "/test",
    component: () => import("@/views/dev/TestView.vue"),
    meta: { title: "Test" },
  },
  {
    path: "/docs",
    component: () => import("@/views/dev/docs/DocsIndexView.vue"),
    meta: { title: "Docs" },
    children: [
      {
        path: "buttons",
        component: () => import("@/views/dev/docs/ExampleButtonsView.vue"),
        meta: { title: "Example Buttons" },
      },
      {
        path: "inputs",
        component: () => import("@/views/dev/docs/ExampleInputsView.vue"),
        meta: { title: "Example Inputs" },
      },
      {
        path: "modals",
        component: () => import("@/views/dev/docs/ExampleModalsView.vue"),
        meta: { title: "Example Modals" },
      },
    ],
  },
];
