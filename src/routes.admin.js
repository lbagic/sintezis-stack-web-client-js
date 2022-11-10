import { adminRoutes } from "./modules/admin/adminRoutes";
import { accountRoutes } from "./modules/account/accountRoutes";
import { testRoutes } from "./modules/test/testRoutes";

/**
 * VueRouter routes.
 *
 * @type {import("vue-router").RouteRecordRaw[]}
 */
export const routes = [
  // Import module routes
  ...accountRoutes,
  ...adminRoutes,
];

if (import.meta.env.DEV) routes.push(...testRoutes);
