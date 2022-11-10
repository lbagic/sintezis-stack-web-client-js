import { adminRoutes } from "./modules/admin/adminRoutes";
import { authRoutes } from "./modules/auth/authRoutes";
import { testRoutes } from "./modules/test/testRoutes";

/**
 * VueRouter routes.
 * @type {import("vue-router").RouteRecordRaw[]}
 */
export const routes = [
  // Import module routes
  ...authRoutes,
  ...adminRoutes,
];

if (import.meta.env.DEV) routes.push(...testRoutes);
