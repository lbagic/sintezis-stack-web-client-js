import { defineStore } from "pinia";

export const useCommonStore = defineStore({
  id: "common",
  state: () => ({
    data: undefined,
  }),
  getters: {},
  actions: {},
});
