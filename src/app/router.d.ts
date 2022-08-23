import { ROLES } from "../constants/ROLES"

export {}

declare module 'vue-router' {
  interface RouteMeta {
    title: string,
    authorizedRoles: typeof ROLES[keyof typeof ROLES][]
  }
}
