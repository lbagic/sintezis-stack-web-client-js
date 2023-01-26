import { createEnum } from "@/utils/enums";

export const ROLES = createEnum({
  Administrator: "Administrator",
  Guest: "Guest",
  User: "User",
} as const);
