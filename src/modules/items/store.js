import { defineStore } from "pinia";

/**
 * @returns {{
 *  items: any[],
 * }}
 */
export const itemStoreState = () => ({
  items: [],
});

export const useItemStore = defineStore("item", {
  state: itemStoreState,
  actions: {
    addItems() {
      this.items.push("item");
    },
  },
});
