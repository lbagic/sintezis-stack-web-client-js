/** @type { import("vue-router").RouteRecordRaw[] } */
export const authRoutes = [
  {
    path: "/login",
    component: () => import("./views/AuthLoginView.vue"),
    meta: {
      title: "Log In",
      authorize: ({ isLoggedIn }) => !isLoggedIn,
    },
  },
  {
    path: "/register",
    component: () => import("./views/AuthRegisterView.vue"),
    meta: {
      title: "Register",
      authorize: ({ isLoggedIn }) => !isLoggedIn,
    },
  },
];
