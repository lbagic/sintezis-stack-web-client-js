import { lifecycleHooks } from "@/hooks";
import { grpc } from "@/services/api/grpc";
import { feedback } from "@/utils/feedback";
import { createHash } from "@/utils/hash";
import type {
  Auth,
  LoginRequest,
  PasswordRecoverRequest,
  PasswordResetRequest,
  RegisterRequest,
  VerifyAccountRequest,
} from "@buf/sintezis_reti.bufbuild_es/account_pb";
import type { User } from "@buf/sintezis_reti.bufbuild_es/user_pb";
import { defineStore } from "pinia";

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
    handleLogin(response: Auth) {
      this.token = response.token;
      this.user = response.user;
      lifecycleHooks.onLoggedIn();
      this.router.push("/");
      return response;
    },
    async login(payload: Partial<LoginRequest>) {
      const password = await createHash(payload.password);
      const response = await grpc.AccountService.login({
        ...payload,
        password,
      });
      return this.handleLogin(response);
    },
    async verifyAccount(payload: Partial<VerifyAccountRequest>) {
      const response = await grpc.AccountService.verifyAccount(payload);
      return this.handleLogin(response);
    },
    register(payload: Partial<RegisterRequest>) {
      return grpc.AccountService.register(payload);
    },
    recoverPassword(payload: Partial<PasswordRecoverRequest>) {
      return grpc.AccountService.passwordRecover(payload);
    },
    async resetPassword(payload: Partial<PasswordResetRequest>) {
      const response = await grpc.AccountService.passwordReset(payload);
      this.router.push("login");
      return response;
    },
    logout() {
      this.$reset();
      feedback.message.success("Logged out successfully.");
      lifecycleHooks.onLoggedOut();
      this.router.push("login");
    },
  },
  persist: true,
});
