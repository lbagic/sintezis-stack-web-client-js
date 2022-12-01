import { lifecycleHooks } from "@/lifecycleHooks";
import { defineStore } from "pinia";
import { accountService } from "./accountService";

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
    /** @type { typeof accountService.login } */
    async login(payload) {
      const response = await accountService.login(payload);
      this.token = response.token;
      this.user = response.user;
      this.$router.push("/");
      lifecycleHooks.onLoggedIn();
      return response;
    },
    logout() {
      this.$reset();
      this.$router.push("/login");
      lifecycleHooks.onLoggedOut();
    },
  },
  persist: true,
});
