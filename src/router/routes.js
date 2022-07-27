import HomeView from "../views/HomeView.vue";
import { aclRoutes } from "./routes.acl";

/**
 * VueRouter routes.
 * @type {import("vue-router").RouteRecordRaw[]}
 */

export const routes = [
  {
    path: "/",
    component: HomeView,
    meta: { userOnly: true },
  },
  {
    path: "/about",
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/test",
    component: () => import("../views/TestView.vue"),
  },
  ...aclRoutes,
];
