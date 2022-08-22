import { defineStore } from "pinia";

/**
 * @returns {{
 *  token: string,
 * }}
 */
export const authStoreState = () => ({
  token: "",
});

export const useAuthStore = defineStore("auth", {
  state: authStoreState,
  getters: {
    isLoggedIn: (ctx) => !!ctx.token,
  },
});
