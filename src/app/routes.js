import { authRoutes } from "../modules/auth/routes";
import { commonRoutes } from "../modules/common/routes";
import { userRoutes } from "../modules/user/routes";

/**
 * VueRouter routes.
 * @type {import("vue-router").RouteRecordRaw[]}
 */
export const routes = [...commonRoutes, ...authRoutes, ...userRoutes];
