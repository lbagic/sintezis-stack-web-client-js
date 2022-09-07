import { ROLES } from "../../enums/ROLES";

/**
 * VueRouter routes.
 * @type {import("vue-router").RouteRecordRaw[]}
 */
export const authRoutes = [
  {
    path: "/login",
    component: () => import("./views/LoginView.vue"),
    meta: {
      title: "Log In",
      authorizeRole: ({ roleId }) =>
        !Object.values(ROLES.enum).includes(roleId),
    },
  },
  {
    path: "/register",
    component: () => import("./views/RegisterView.vue"),
    meta: {
      title: "Register",
      authorizeRole: ({ roleId }) =>
        !Object.values(ROLES.enum).includes(roleId),
    },
  },
];
