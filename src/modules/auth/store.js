import { defineStore } from "pinia";

/**
 * @returns {{
 *  data?: undefined,
 * }}
 */
export const authStoreState = () => ({
  data: undefined,
});

export const useAuthStore = defineStore("auth", {
  state: authStoreState,
});
