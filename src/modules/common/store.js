import { defineStore } from "pinia";

/**
 * @returns {{
 *  data?: undefined,
 * }}
 */
export const commonStoreState = () => ({
  data: undefined,
});

export const useStore = defineStore("common", {
  state: commonStoreState,
});
