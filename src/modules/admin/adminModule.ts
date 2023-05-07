import { defineStore } from "pinia";

export const useAdminModule = defineStore({
  id: "admin",
  state: () => ({ showSideNav: false }),
  getters: {},
  actions: {},
  persist: true,
});
