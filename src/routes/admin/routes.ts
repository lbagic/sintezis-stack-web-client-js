import { adminResources } from "@/modules/admin/adminResources";
import type { RouteRecordRaw } from "vue-router";

function getResourceName(route: any) {
  return (
    adminResources.find((el) => el.id === route.params.resourceId)?.name ?? ""
  );
}

export const routes: RouteRecordRaw[] = [
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
          breadcrumbs: () => [
            { label: "Dashboard", to: { name: "dashboard" } },
          ],
        },
      },
      {
        name: "crud-resource-details",
        path: "crud/:resourceId/details/:entityId",
        component: () => import("@/views/admin/AdminCrudDetailsView.vue"),
        beforeEnter(to, from, next) {
          const id = to.params.resourceId;
          const resource = adminResources.find((el) => el.id === id);
          return !resource
            ? next("/")
            : !resource.useDetails
            ? next(`/crud/${resource.id}`)
            : next();
        },
        meta: {
          title: (route) => getResourceName(route) + " details",
          breadcrumbs: (route) => [
            { label: "Dashboard", to: { name: "dashboard" } },
            { label: getResourceName(route), to: { name: "crud-resource" } },
            { label: "Details", to: { name: "crud-resource-details" } },
          ],
        },
      },
      {
        name: "crud-resource",
        path: "crud/:resourceId",
        component: () => import("@/views/admin/AdminCrudView.vue"),
        beforeEnter(to, from, next) {
          const id = to.params.resourceId;
          const resource = adminResources.find((el) => el.id === id);
          return !resource ? next("/") : next();
        },
        meta: {
          title: (route) => getResourceName(route),
          breadcrumbs: (route) => [
            { label: "Dashboard", to: { name: "dashboard" } },
            { label: getResourceName(route), to: { name: "crud-resource" } },
          ],
        },
      },
    ],
  },
];
