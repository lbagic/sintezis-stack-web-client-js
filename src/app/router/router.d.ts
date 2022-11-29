import { ROLES } from "@/enums/ROLES"

declare module 'vue-router' {
  interface RouteMeta {
    title: string,
    authorize: (options: { roles: typeof ROLES.values, isLoggedIn: boolean }) => boolean,
    breadcrumbs: (params: Record<string, any>) => { name: string, routeName: string }[]
  }
  interface Router {
    referrer: RouteLocationNormalizedLoaded
  }
}

export {}
