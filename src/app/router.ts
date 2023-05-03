import type { ROLES } from "@/enums/ROLES";
import { useAccountService } from "@/modules/account/accountService";
import { routes } from "@/routes";
import { feedback } from "@/utils/feedback";
import { applicationTitle } from "@/utils/globalProperties";
import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
} from "vue-router";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export const defaultRoute = import.meta.env.VITE_ADMIN_PANEL
  ? { user: "/app", visitor: "/login" }
  : { user: "/app", visitor: "/login" };

function useRouteValidation() {
  const { roles, isLoggedIn } = useAccountService();
  return (route: RouteLocationNormalized) =>
    !!route.matched.length &&
    route.matched.every(
      (r) => r.meta.authorize?.({ roles, isLoggedIn }) ?? true
    );
}

const implicitLoadingBar = true;
function useRouteLoadingBar(isValid: boolean, routeLoadingBar?: boolean) {
  const showLoadingBar = routeLoadingBar ?? implicitLoadingBar;
  if (!showLoadingBar) return;
  feedback.loadingBar.start();
  setTimeout(isValid ? feedback.loadingBar.finish : feedback.loadingBar.error);
}

router.beforeEach((to, from, next) => {
  router.previousRoute = from.matched.length ? from : to;
  const { isLoggedIn } = useAccountService();
  const validate = useRouteValidation();
  const isValid = validate(to);
  useRouteLoadingBar(isValid, to.meta.loadingBar);

  return isValid
    ? next()
    : validate(from)
    ? next(false)
    : next(isLoggedIn ? defaultRoute.user : defaultRoute.visitor);
});

router.afterEach((to) => {
  document.title = to.matched.reduce((a, c) => {
    if (typeof c.meta.title === "function") return c.meta.title(to);
    else if (typeof c.meta.title === "string") return c.meta.title;
    else return a;
  }, applicationTitle);
});

export type RouteBreadcrumb = {
  label: string;
  to: { name: string } | { path: string };
};
declare module "vue-router" {
  interface Router {
    previousRoute: RouteLocationNormalized;
  }
  interface RouteMeta {
    authorize?: (options: {
      roles: typeof ROLES.values | string[];
      isLoggedIn: boolean;
    }) => boolean;
    breadcrumbs?: (route: RouteLocationNormalized) => RouteBreadcrumb[];
    title?: string | ((route: RouteLocationNormalized) => string);
    loadingBar?: boolean;
  }
}
