/** @type { import("vue-router").RouteRecordRaw[] } */
export const exampleRoutes = [
  {
    path: "/example",
    component: () => import("./views/ExampleView.vue"),
    meta: {
      title: "example",
    },
  },
];
