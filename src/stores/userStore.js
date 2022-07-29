import { defineStore } from "pinia";

/**
 * @returns {{
 *  user?: User,
 * }}
 */

export const userStoreState = () => ({
  user: undefined,
});

export const useUserStore = defineStore({
  id: "user",
  state: userStoreState,
});
