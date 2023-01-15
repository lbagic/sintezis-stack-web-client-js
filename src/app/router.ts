import type { ROLES } from "@/enums/ROLES";
import { useAccountStore } from "@/modules/account/accountStore";
import { routes } from "@/routes";
import { applicationTitle } from "@/utils/globalProperties";
import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
  type RouteRecordNormalized,
} from "vue-router";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

const fallback = { user: "/", visitor: "/login" };

const createAuthorization =
  (roles: string[], isLoggedIn: boolean) =>
  (route: RouteLocationNormalized | RouteRecordNormalized) =>
    route.meta.authorize?.({ roles, isLoggedIn }) ?? true;

router.beforeEach((to, from, next) => {
  const { roles, isLoggedIn } = useAccountStore();
  const authorize = createAuthorization(roles, isLoggedIn);
  const referrer = router.referrer;
  router.referrer = from;

  document.title = to.matched.reduce((a, c) => {
    if (typeof c.meta.title === "function") return c.meta.title(to);
    else if (typeof c.meta.title === "string") return c.meta.title;
    else return a;
  }, applicationTitle);

  const isFound = !!to.matched.length;
  const isAuthorized = to.matched.every(authorize);
  const isValid = isFound && isAuthorized;

  return isValid
    ? next()
    : referrer && authorize(from)
    ? next(from)
    : referrer && authorize(referrer)
    ? next(referrer)
    : next(isLoggedIn ? fallback.user : fallback.visitor);
});

export type RouteBreadcrumb = {
  label: string;
  to: { name: string };
};
declare module "vue-router" {
  interface RouteMeta {
    title?: string | ((route: RouteLocationNormalized) => string);
    authorize?: (options: {
      roles: typeof ROLES.values | string[];
      isLoggedIn: boolean;
    }) => boolean;
    breadcrumbs?: (route: RouteLocationNormalized) => RouteBreadcrumb[];
  }
  interface Router {
    referrer?: RouteLocationNormalized;
  }
}
