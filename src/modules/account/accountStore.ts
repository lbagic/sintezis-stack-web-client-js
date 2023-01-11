import type { LoginRequest } from "@/gen/account_pb";
import type { User } from "@/gen/user_pb";
import { lifecycleHooks } from "@/hooks";
import { defineStore } from "pinia";
import { accountService } from "./accountService";

export const useAccountStore = defineStore({
  id: "account",
  state: () => ({
    token: "",
    user: undefined as User | undefined,
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,
    roles: (state) => state.user?.roles.map((el) => el.name) ?? [],
  },
  actions: {
    async login(payload: Partial<LoginRequest>) {
      const response = await accountService.login(payload);
      this.token = response.token;
      this.user = response.user;
      this.router.push("/");
      lifecycleHooks.onLoggedIn();
      return response;
    },
    logout() {
      this.$reset();
      this.router.push("/login");
      lifecycleHooks.onLoggedOut();
    },
  },
  persist: true,
});
