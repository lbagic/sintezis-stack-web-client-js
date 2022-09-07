import { createRouter, createWebHistory } from "vue-router";
import { ROLES } from "../enums/ROLES";

import { authRoutes } from "../modules/auth/routes";
import { useAuthStore } from "../modules/auth/store";
import { commonRoutes } from "../modules/common/routes";
import { testRoutes } from "../modules/test/routes";

const defaultRoutes = {
  roles: {
    [ROLES.enum.ADMIN]: { notAuthorized: "/", notFound: "/" },
    [ROLES.enum.USER]: { notAuthorized: "/", notFound: "/" },
  },
  guest: { notAuthorized: "/login", notFound: "/" },
};

function getDefaultRoute({ roleId }) {
  const route = defaultRoutes.roles[roleId];
  return route ? route : defaultRoutes.guest;
}

function authorizeRoute({ roleId, location }) {
  return location.matched.every((route) => {
    const authorizeRole = route.meta?.authorizeRole;
    return authorizeRole ? authorizeRole({ roleId }) : true;
  });
}

// Vue Router
export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  /** @type {import("vue-router").RouteRecordRaw[]} */
  routes: [
    // Registered vue routes
    ...commonRoutes,
    ...authRoutes,
    ...testRoutes,
  ],
});

// Vue Router guard
router.beforeEach((to, from, next) => {
  document.title = to.meta?.title ?? "Application";
  const { roleId } = useAuthStore();
  const defaultRoute = getDefaultRoute({ roleId });

  const isNotFound = !to.matched.length;
  const isNotAuthorized = !authorizeRoute({ roleId, location: to });

  return isNotFound
    ? next(defaultRoute.notFound)
    : isNotAuthorized
    ? next(defaultRoute.notAuthorized)
    : next();
});
