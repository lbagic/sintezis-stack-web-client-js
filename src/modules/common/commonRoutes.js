/** @type { import("vue-router").RouteRecordRaw[] } */
export const commonRoutes = [
  {
    path: "/",
    component: () => import("./views/IndexView.vue"),
    meta: {
      title: "Application",
    },
  },
];

if (!import.meta.env.PROD)
  commonRoutes.push(
    {
      path: "/test",
      component: () => import("./views/TestView.vue"),
      meta: {
        title: "Test",
      },
    },
    {
      path: "/test-inputs",
      component: () => import("./views/TestInputsView.vue"),
      meta: {
        title: "Test",
      },
    }
  );
