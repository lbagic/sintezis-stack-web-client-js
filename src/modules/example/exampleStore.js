import { defineStore } from "pinia";

export const useExampleStore = defineStore({
  id: "example",
  state: () => ({
    token: undefined,
  }),
  getters: {},
  actions: {},
});
