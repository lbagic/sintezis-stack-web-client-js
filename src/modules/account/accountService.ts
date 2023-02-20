import { defaultRoute } from "@/app/router";
import { lifecycleHooks } from "@/hooks";
import type { Auth } from "@buf/sintezis_reti.bufbuild_es/account_pb";
import type { User } from "@buf/sintezis_reti.bufbuild_es/user_pb";
import { useMessage } from "naive-ui";
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
    handleLogin(payload: Auth) {
      this.token = payload.token;
      this.user = payload.user;

      lifecycleHooks.onLoggedIn();
      this.router.push(defaultRoute.user);
      return payload;
    },
    useLogout() {
      const message = useMessage();
      const account = useAccountService();

      return () => {
        account.$reset();
        message.success("Logged out successfully.");
        lifecycleHooks.onLoggedOut();
        this.router.push(defaultRoute.visitor);
      };
    },
  },
  persist: true,
});
