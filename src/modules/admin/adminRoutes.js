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
        name: "crud-details-view",
        path: "crud/:resourceId/:entityId",
        component: () => import("./views/AdminCrudDetailsView.vue"),
        beforeEnter(to, from, next) {
          const resource = adminResources.find(
            (el) => el.id === to.params.resourceId
          );
          if (!resource) return next("/");
          if (!resource.useDetails)
            return next(`/crud/${resource.id}/${to.params.entityId}`);
          document.title = resource.name + " details";
          return next();
        },
      },
      {
        name: "crud-view",
        path: "crud/:resourceId",
        component: () => import("./views/AdminCrudView.vue"),
        beforeEnter(to, from, next) {
          const resource = adminResources.find(
            (el) => el.id === to.params.resourceId
          );
          if (!resource) return next("/");
          document.title = resource.name;
          return next();
        },
      },
    ],
  },
];
