import HomeView from "../views/HomeView.vue";

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
  // {
  //   path: "/login",
  //   component: LoginView,
  //   meta: { visitorOnly: true, title: "Log In" },
  // },
  {
    path: "/about",
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/test",
    component: () => import("../views/TestView.vue"),
  },
];
