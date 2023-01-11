import { createEnum } from "@/utils/enums";

export const ROLES = createEnum({
  admin: "admin",
  user: "user",
} as const);
