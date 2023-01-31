import { lifecycleHooks } from "@/hooks";
import { feedback } from "@/utils/feedback";
import type { LoginRequest } from "@buf/sintezis_reti.bufbuild_es/account_pb";
import type { User } from "@buf/sintezis_reti.bufbuild_es/user_pb";
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
      try {
        const response = await accountService.login(payload);
        feedback.message.success("Logged in successfully.");
        this.token = response.token;
        if (response.user) this.user = response.user;
        lifecycleHooks.onLoggedIn();
        this.router.push("/");
        return response;
      } catch (err) {
        feedback.message.error("Failed to log in.");
        throw err;
      }
    },
    logout() {
      this.$reset();
      feedback.message.success("Logged out successfully.");
      lifecycleHooks.onLoggedOut();
      this.router.push("/login");
    },
  },
  persist: true,
});
