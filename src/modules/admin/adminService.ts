import { defineStore } from "pinia";

export const useAdminService = defineStore({
  id: "admin",
  state: () => ({ showSideNav: false }),
  getters: {},
  actions: {},
  persist: true,
});
