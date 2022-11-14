import { adminServices } from "./adminServices";

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
        path: "crud/:serviceName",
        component: () => import("./views/AdminCrudView.vue"),
        beforeEnter(to, from, next) {
          const serviceName = to.params.serviceName;
          const serviceExists = adminServices.some(
            ({ name }) => name === serviceName
          );
          if (!serviceExists) next("/");
          else next();
        },
      },
    ],
  },
];
