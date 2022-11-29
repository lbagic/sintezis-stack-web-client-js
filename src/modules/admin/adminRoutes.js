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
        name: "dashboard",
        path: "",
        component: () => import("./views/AdminDashboardView.vue"),
        meta: {
          title: "Dashboard",
          breadcrumbs: () => [{ name: "Dashboard", routeName: "dashboard" }],
        },
      },
      {
        name: "crud-resource-details",
        path: "crud/:resourceId/details/:entityId",
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
        meta: {
          breadcrumbs: (params) => [
            { name: "Dashboard", routeName: "dashboard" },
            { name: params.resourceId, routeName: "crud-resource" },
            { name: "Details", routeName: "crud-resource-details" },
          ],
        },
      },
      {
        name: "crud-resource",
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
        meta: {
          breadcrumbs: (params) => [
            { name: "Dashboard", routeName: "dashboard" },
            { name: params.resourceId, routeName: "crud-resource" },
          ],
        },
      },
    ],
  },
];
