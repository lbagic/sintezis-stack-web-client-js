import type { LoginRequest } from "@buf/sintezis_reti.bufbuild_es/account_pb";
import type { User } from "@buf/sintezis_reti.bufbuild_es/user_pb";
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
      if (response.user) this.user = response.user;
      lifecycleHooks.onLoggedIn();
      return response;
    },
    logout() {
      this.$reset();
      lifecycleHooks.onLoggedOut();
    },
  },
  persist: true,
});
