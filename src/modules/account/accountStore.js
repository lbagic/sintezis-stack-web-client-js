import { User } from "@/gen/user_pb";
import { defineStore } from "pinia";

export const useAccountStore = defineStore({
  id: "account",
  state: () => ({
    token: "",
    /** @type { User } */
    user: undefined,
  }),
  getters: {
    isLoggedIn: (ctx) => !!ctx.token,
    roles: (ctx) => ctx.user?.roles.map((el) => el.name) ?? [],
  },
  actions: {},
  persist: true,
});
