import { defineStore } from "pinia";

export const useAdminStore = defineStore({
  id: "admin",
  state: () => ({
    showSideNav: false,
  }),
  getters: {},
  actions: {},
  persist: true,
});
