import type { RouteRecordRaw } from "vue-router";

export const developmentRoutes: RouteRecordRaw[] = [
  {
    path: "/test",
    component: () => import("@/views/development/TestView.vue"),
    meta: { title: "Test" },
  },
  {
    path: "/docs",
    component: () => import("@/views/development/docs/DocsIndexView.vue"),
    meta: { title: "Docs" },
    children: [
      {
        path: "buttons",
        component: () =>
          import("@/views/development/docs/ExampleButtonsView.vue"),
        meta: { title: "Example Buttons" },
      },
      {
        path: "inputs",
        component: () =>
          import("@/views/development/docs/ExampleInputsView.vue"),
        meta: { title: "Example Inputs" },
      },
      {
        path: "modals",
        component: () =>
          import("@/views/development/docs/ExampleModalsView.vue"),
        meta: { title: "Example Modals" },
      },
    ],
  },
];
