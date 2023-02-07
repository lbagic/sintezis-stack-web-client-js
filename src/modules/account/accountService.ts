import type {
  LoginRequest,
  VerifyAccountRequest,
  Auth,
} from "@buf/sintezis_reti.bufbuild_es/account_pb";
import { lifecycleHooks } from "@/hooks";
import { feedback } from "@/utils/feedback";
import type { User } from "@buf/sintezis_reti.bufbuild_es/user_pb";
import { defineStore } from "pinia";
import { createHash } from "@/utils/hash";
import { grpc } from "@/services/api/grpc";

export const useAccountService = defineStore({
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
    handleLogin(response: Auth, message?: string) {
      if (message) feedback.message.success(message);
      this.token = response.token;
      this.user = response.user;
      lifecycleHooks.onLoggedIn();
      this.router.push("/");
      return response;
    },
    async login(payload: Partial<LoginRequest>) {
      try {
        const password = await createHash(payload.password);
        const response = await grpc.AccountService.login({
          ...payload,
          password,
        });
        return this.handleLogin(response, "Logged in successfully.");
      } catch (err) {
        feedback.message.error("Failed to log in.");
        throw err;
      }
    },
    async verifyEmail(payload: Partial<VerifyAccountRequest>) {
      try {
        const response = await grpc.AccountService.verifyAccount(payload);
        return this.handleLogin(response, "Account verified");
      } catch (err) {
        feedback.message.error("Failed to verify account.");
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
