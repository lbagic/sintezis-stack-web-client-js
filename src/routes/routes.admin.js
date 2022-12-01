// @ts-check
import { adminResources } from "../modules/admin/adminResources";
import { routes as developmentRoutes } from "@/routes/routes.dev";

/** @type { import("vue-router").RouteRecordRaw[] } */
export const routes = [
  {
    path: "/login",
    component: () => import("@/views/account/AccountLoginView.vue"),
    meta: {
      title: "Log In",
      authorize: ({ isLoggedIn }) => !isLoggedIn,
    },
  },
  {
    path: "/",
    component: () => import("@/views/admin/AdminIndexView.vue"),
    meta: {
      title: "Admin Panel",
      authorize: ({ isLoggedIn }) => isLoggedIn,
    },
    children: [
      {
        name: "dashboard",
        path: "",
        component: () => import("@/views/admin/AdminDashboardView.vue"),
        meta: {
          title: "Dashboard",
          breadcrumbs: () => [{ name: "Dashboard", routeName: "dashboard" }],
        },
      },
      {
        name: "crud-resource-details",
        path: "crud/:resourceId/details/:entityId",
        component: () => import("@/views/admin/AdminCrudDetailsView.vue"),
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
        component: () => import("@/views/admin/AdminCrudView.vue"),
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

if (import.meta.env.DEV) routes.push(...developmentRoutes);
