/**
 * VueRouter routes.
 * @type {import("vue-router").RouteRecordRaw[]}
 */
export const authRoutes = [
  {
    path: "/login",
    component: () => import("./views/LoginView.vue"),
    meta: { visitorOnly: true, title: "Log In" },
  },
  {
    path: "/register",
    component: () => import("./views/LogoutView.vue"),
    meta: { userOnly: true, title: "Register" },
  },
  {
    path: "/logout",
    component: () => import("./views/RegisterView.vue"),
    meta: { userOnly: true, title: "Logout" },
  },
];
