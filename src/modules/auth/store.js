import { defineStore } from "pinia";

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
    isLoggedIn: (ctx) => !!ctx.token,
    roleId: (ctx) => ctx.user?.roleId,
  },
  persist: true,
});
