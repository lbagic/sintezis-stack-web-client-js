import { defineStore } from "pinia";

/**
 * @returns {{
 *  user: User,
 * }}
 */
export const userStoreState = () => ({
  user: [],
});

export const useUserStore = defineStore("user", {
  state: userStoreState,
});
