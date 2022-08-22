/**
 * VueRouter routes.
 * @type {import("vue-router").RouteRecordRaw[]}
 */
export const userRoutes = [
  {
    path: "/user/profile",
    component: () => import("./views/ProfileView.vue"),
    meta: { userOnly: true },
  },
];
