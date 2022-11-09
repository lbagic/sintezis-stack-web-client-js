// eslint-disable-next-line no-unused-vars
import { User } from "@/gen/proto/models/user_pb";
import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth",
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
