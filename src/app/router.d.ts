import { ROLES } from "../enums/ROLES"

type UserRoleId = typeof ROLES.values[number]

declare module 'vue-router' {
  interface RouteMeta {
    title: string,
    authorize: (currentRole?: UserRoleId) => boolean
  }
}

export {}
