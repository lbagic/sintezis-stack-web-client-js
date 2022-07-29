import { defineStore } from "pinia";

/**
 * @returns {{
 *  token: string,
 * }}
 */

export const authStoreState = () => ({
  token: "",
});

export const useAuthStore = defineStore({
  id: "auth",
  state: authStoreState,
});
