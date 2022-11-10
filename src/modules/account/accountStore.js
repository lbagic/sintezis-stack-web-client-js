import { defineStore } from "pinia";

export const useAccountStore = defineStore({
  id: "account",
  state: () => ({
    token: "",
    /** @type { import("@/gen/user_pb").User } */
    user: undefined,
  }),
  getters: {
    isLoggedIn: (ctx) => !!ctx.token,
    roles: (ctx) => ctx.user?.roles.map((el) => el.name) ?? [],
  },
  actions: {},
  persist: true,
});
