import { createEnum } from "./base/enum";

export const ROLES = createEnum(
  Object.freeze({
    ADMIN: 1,
    USER: 2,
  })
);
