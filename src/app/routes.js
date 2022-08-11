import { authRoutes } from "../modules/auth/routes";
import { commonRoutes } from "../modules/common/routes";

/**
 * VueRouter routes.
 * @type {import("vue-router").RouteRecordRaw[]}
 */
export const routes = [
  // Module routes go here
  ...commonRoutes,
  ...authRoutes,
];
