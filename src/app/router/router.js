import { useAccountStore } from "@/modules/account/accountStore";
import { appName } from "@/app/setup";
import { createRouter, createWebHistory } from "vue-router";
import { routes as webClientRoutes } from "@/routes";
import { routes as webAdminRoutes } from "@/routes.admin";

// Vue Router
export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: import.meta.env.VITE_ADMIN_PANEL ? webAdminRoutes : webClientRoutes,
});

const fallbackRoutes = {
  notAuthorized: "/login",
  notFound: "/",
};

router.beforeEach((to, from, next) => {
  const previousRoute = router.referrer;
  router.referrer = from;

  document.title = to.matched.reduce((a, c) => c.meta.title ?? a, appName);
  const { roles, isLoggedIn } = useAccountStore();
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
