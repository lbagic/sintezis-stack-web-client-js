import { defineStore } from "pinia";

export const useAccountStore = defineStore({
  id: "account",
  state: () => ({
    token: undefined,
    user: undefined,
  }),
  getters: {
    isLoggedIn: (ctx) => !!ctx.token,
    roles: (ctx) => ctx.user?.roles.map((el) => el.name) ?? [],
  },
  actions: {
    logout() {
      this.$reset();
      this.$router.go();
    },
  },
  persist: true,
});
