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

const fallback = {
  user: "/",
  visitor: "/login",
};

const createAuthorization = (roles, isLoggedIn) => (route) =>
  route.meta.authorize?.({ roles, isLoggedIn }) ?? true;

router.beforeEach((to, from, next) => {
  const { roles, isLoggedIn } = useAccountStore();
  const authorize = createAuthorization(roles, isLoggedIn);
  const referrer = router.referrer;

  router.referrer = from;
  document.title = to.matched.reduce((a, c) => c.meta.title ?? a, appName);

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
