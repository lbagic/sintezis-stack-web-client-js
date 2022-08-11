import { defineStore } from "pinia";

/**
 * @returns {{
 *  users?: User[],
 * }}
 */
export const userStoreState = () => ({
  users: [],
});

export const useUserStore = defineStore("user", {
  state: userStoreState,
});
