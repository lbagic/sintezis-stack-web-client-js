import { createRouter, createWebHistory } from "vue-router";
import { ROLES } from "../constants/ROLES";
import { authRoutes } from "../modules/auth/routes";
import { useAuthStore } from "../modules/auth/store";
import { commonRoutes } from "../modules/common/routes";
import { itemRoutes } from "../modules/items/routes";

const settings = {
  defaultRoute: {
    [ROLES.GUEST]: { notAuthorized: "/login", notFound: "/" },
    [ROLES.USER]: { notAuthorized: "/", notFound: "/" },
    [ROLES.ADMIN]: { notAuthorized: "/", notFound: "/" },
  },
  authorizeLocation: (role, location) =>
    location.matched
      .filter((route) => route.meta.authorizedRoles?.length)
      .every((route) => route.meta.authorizedRoles.includes(role)),
};

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  /** @type {import("vue-router").RouteRecordRaw[]} */
  routes: [...commonRoutes, ...authRoutes, ...itemRoutes],
});

router.beforeEach((to, from, next) => {
  document.title = to.meta?.title ?? "Application";
  const { role } = useAuthStore();

  const isNotFound = !to.matched.length;
  const isNotAuthorized = !settings.authorizeLocation(role, to);

  return isNotFound
    ? next(settings.defaultRoute[role].notFound)
    : isNotAuthorized
    ? next(settings.defaultRoute[role].notAuthorized)
    : next();
});
