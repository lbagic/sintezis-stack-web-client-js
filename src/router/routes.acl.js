/**
 * VueRouter routes.
 * @type {import("vue-router").RouteRecordRaw[]}
 */

export const aclRoutes = [
  {
    path: "/login",
    component: () => import("../views/acl/LoginView.vue"),
    meta: { visitorOnly: true, title: "Log In" },
  },
  {
    path: "/register",
    component: () => import("../views/acl/RegisterView.vue"),
    meta: { userOnly: true, title: "Register" },
  },
  {
    path: "/logout",
    component: () => import("../views/acl/LogoutView.vue"),
    meta: { userOnly: true, title: "Logout" },
  },
];
