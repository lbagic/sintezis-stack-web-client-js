import type { RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/views/index/IndexView.vue"),
  },
  {
    path: "/login",
    component: () => import("@/views/account/AccountLoginView.vue"),
    meta: {
      title: "Log In",
      authorize: ({ isLoggedIn }) => !isLoggedIn,
    },
  },
  {
    path: "/register",
    component: () => import("@/views/account/AccountRegisterView.vue"),
    meta: {
      title: "Register",
      authorize: ({ isLoggedIn }) => !isLoggedIn,
    },
  },
];
