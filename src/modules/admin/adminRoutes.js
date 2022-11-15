import { adminResources } from "./adminResources";

/** @type { import("vue-router").RouteRecordRaw[] } */
export const adminRoutes = [
  {
    path: "/",
    component: () => import("./views/AdminIndexView.vue"),
    meta: {
      title: "Admin Panel",
      authorize: ({ isLoggedIn }) => isLoggedIn,
    },
    children: [
      {
        path: "",
        component: () => import("./views/AdminDashboardView.vue"),
        meta: {
          title: "Dashboard",
        },
      },
      {
        name: "crud-view",
        path: "crud/:resourceId",
        component: () => import("./views/AdminCrudView.vue"),
        beforeEnter(to, from, next) {
          const serviceExists = adminResources.some(
            ({ id }) => id === to.params.resourceId
          );
          if (!serviceExists) next("/");
          else next();
        },
      },
    ],
  },
];
