import { defineStore } from "pinia";
import { ROLES } from "../../constants/ROLES";

/**
 * @returns {{
 *  token: string,
 *  user?: Record<string, any>,
 * }}
 */
export const authStoreState = () => ({
  token: "",
  user: undefined,
});

export const useAuthStore = defineStore("auth", {
  state: authStoreState,
  getters: {
    loggedIn: (ctx) => !!ctx.token,
    role: (ctx) => ctx.user?.role ?? ROLES.GUEST,
  },
  persist: true,
});
