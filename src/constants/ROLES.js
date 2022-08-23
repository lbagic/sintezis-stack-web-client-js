/** @typedef { "USER" | "GUEST" | "ADMIN" } Roles */

/** @type { {[key in Roles]: key} } */
export const ROLES = {
  USER: "USER",
  GUEST: "GUEST",
  ADMIN: "ADMIN",
};
