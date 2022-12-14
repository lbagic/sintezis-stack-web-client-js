// @ts-check
import { routes as developmentRoutes } from "@/routes/routes.dev";

/** @type { import("vue-router").RouteRecordRaw[] } */
export const routes = [
  {
    path: "/",
    component: () => import("@/views/IndexView.vue"),
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

if (import.meta.env.DEV) routes.push(...developmentRoutes);
