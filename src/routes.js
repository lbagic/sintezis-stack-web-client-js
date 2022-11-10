import { authRoutes } from "./modules/auth/authRoutes";
import { commonRoutes } from "./modules/common/commonRoutes";
import { testRoutes } from "./modules/test/testRoutes";

/**
 * VueRouter routes.
 * @type {import("vue-router").RouteRecordRaw[]}
 */
export const routes = [
  // Import module routes
  ...authRoutes,
  ...commonRoutes,
];

if (import.meta.env.DEV) routes.push(...testRoutes);
