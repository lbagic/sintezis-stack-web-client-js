import { ROLES } from "../../constants/ROLES";

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
      authorizedRoles: [ROLES.GUEST],
    },
  },
  {
    path: "/register",
    component: () => import("./views/RegisterView.vue"),
    meta: {
      title: "Register",
      authorizedRoles: [ROLES.GUEST],
    },
  },
];
