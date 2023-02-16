import { createEnum } from "@/utils/enums";

export const ROLES = createEnum({
  Admin: "Admin",
  Guest: "Guest",
  User: "User",
} as const);
