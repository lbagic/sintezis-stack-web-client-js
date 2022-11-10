/** @type { import("vue-router").RouteRecordRaw[] } */
export const accountRoutes = [
  {
    path: "/login",
    component: () => import("./views/LoginView.vue"),
    meta: {
      title: "Log In",
      authorize: ({ isLoggedIn }) => !isLoggedIn,
    },
  },
  {
    path: "/register",
    component: () => import("./views/RegisterView.vue"),
    meta: {
      title: "Register",
      authorize: ({ isLoggedIn }) => !isLoggedIn,
    },
  },
];
