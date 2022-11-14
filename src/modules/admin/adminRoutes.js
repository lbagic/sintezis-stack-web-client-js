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
        path: "crud/:resourceName",
        component: () => import("./views/AdminCrudView.vue"),
        beforeEnter(to, from, next) {
          const resourceName = to.params.resourceName;
          const serviceExists = adminResources.some(
            ({ name }) => name === resourceName
          );
          if (!serviceExists) next("/");
          else next();
        },
      },
    ],
  },
];
