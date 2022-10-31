import { ROLES } from "../../enums/ROLES";

/** @type { import("vue-router").RouteRecordRaw[] } */
export const authRoutes = [
  {
    path: "/login",
    component: () => import("./views/AuthLoginView.vue"),
    meta: {
      title: "Log In",
      authorize: (role) => !ROLES.values.includes(role),
    },
  },
  {
    path: "/register",
    component: () => import("./views/AuthRegisterView.vue"),
    meta: {
      title: "Register",
      authorize: (role) => !ROLES.values.includes(role),
    },
  },
];
