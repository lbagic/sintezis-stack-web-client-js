import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    token: "",
    user: undefined,
  }),
  getters: {
    isLoggedIn: (ctx) => !!ctx.token,
    roleId: (ctx) => ctx.user?.roleId,
  },
  actions: {},
  persist: true,
});
