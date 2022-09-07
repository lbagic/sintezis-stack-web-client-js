import { ROLES } from "../enums/ROLES"
export {}

type UserRoleId = typeof ROLES.enum[keyof typeof ROLES.enum]

declare module 'vue-router' {
  interface RouteMeta {
    title: string,
    authorizeRole: ({roleId: UserRoleId}) => boolean
  }
}
