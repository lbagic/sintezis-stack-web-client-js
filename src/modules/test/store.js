import { defineStore } from "pinia";

/**
 * @returns {{
 *  items: any[],
 * }}
 */
export const testStoreState = () => ({
  items: [],
});

export const useTestStore = defineStore("test", {
  state: testStoreState,
  actions: {
    addItems() {
      this.items.push("item");
    },
  },
});
