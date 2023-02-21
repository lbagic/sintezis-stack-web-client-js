import type { RouteRecordRaw } from "vue-router";

export const accountRoutes: RouteRecordRaw[] = [
  {
    path: "/account/login",
    redirect: "/login",
  },
  {
    path: "/account/register",
    redirect: "/register",
  },
  {
    path: "/account/verify-account",
    redirect: "/verify-account",
  },
  {
    path: "/account/recover-password",
    redirect: "/recover-password",
  },
  {
    path: "/account/reset-password",
    redirect: "/reset-password",
  },
  {
    path: "/account",
    component: () => import("@/views/account/AccountIndexView.vue"),
    meta: { authorize: ({ isLoggedIn }) => !isLoggedIn },
    children: [
      {
        path: "",
        redirect: "login",
      },
      {
        path: "login",
        name: "login",
        alias: "/login",
        component: () => import("@/views/account/AccountLoginView.vue"),
        meta: { title: "Login" },
      },
      {
        path: "register",
        name: "register",
        alias: "/register",
        component: () => import("@/views/account/AccountRegisterView.vue"),
        meta: { title: "Register" },
      },
      {
        path: "verify-account",
        name: "verify-account",
        alias: "/verify-account",
        component: () => import("@/views/account/AccountVerifyView.vue"),
        meta: { title: "Verify account" },
      },
      {
        path: "recover-password",
        name: "recover-password",
        alias: "/recover-password",
        component: () => import("@/views/account/AccountRecoverView.vue"),
        meta: { title: "Recover account" },
      },
      {
        path: "reset-password",
        name: "reset-password",
        alias: "/reset-password",
        component: () => import("@/views/account/AccountResetView.vue"),
        meta: { title: "Reset password" },
      },
    ],
  },
];
