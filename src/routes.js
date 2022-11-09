import { authRoutes } from "./modules/auth/authRoutes";
import { useAuthStore } from "./modules/auth/authStore";
import { commonRoutes } from "./modules/common/commonRoutes";
import { exampleRoutes } from "./modules/example/exampleRoutes";
import { appName } from "./setup";

/**
 * VueRouter routes.
 * @type {import("vue-router").RouteRecordRaw[]}
 */
export const routes = [
  // app routes
  ...commonRoutes,
  ...authRoutes,
  ...exampleRoutes,
];

const fallbackRoutes = {
  notAuthorized: "/login",
  notFound: "/",
};

/** @type { (router: import("vue-router").Router) => void } */
export const createNavguard = (router) => {
  router.beforeEach((to, from, next) => {
    const previousRoute = router.referrer;
    router.referrer = from;

    document.title = to.matched.reduce((a, c) => c.meta.title ?? a, appName);
    const { roles, isLoggedIn } = useAuthStore();
    const isFound = to.matched.length;
    const isAuthorized = to.matched.every(
      (route) => route.meta.authorize?.({ roles, isLoggedIn }) ?? true
    );

    return !isFound
      ? next(previousRoute ? false : fallbackRoutes.notFound)
      : !isAuthorized
      ? next(previousRoute ? false : fallbackRoutes.notAuthorized)
      : next();
  });
};
