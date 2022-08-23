/**
 * VueRouter routes.
 * @type {import("vue-router").RouteRecordRaw[]}
 */
export const itemRoutes = [
  {
    path: "/items",
    component: () => import("./views/ItemView.vue"),
    meta: {
      title: "Items",
    },
  },
];
