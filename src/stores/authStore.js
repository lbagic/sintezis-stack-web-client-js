import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({ token: "" }),
  getters: {},
  actions: {},
});
