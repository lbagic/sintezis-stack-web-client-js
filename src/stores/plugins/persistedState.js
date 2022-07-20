import { createPersistedState } from "pinia-plugin-persistedstate";

/**
 * Attaches persisted state pinia plugin.
 *
 * @param {import("pinia").Pinia} pinia Decsripton.
 */

export const usePersistedState = (pinia) =>
  pinia.use(
    createPersistedState({
      storage: localStorage,
      serializer: {
        serialize: JSON.stringify,
        deserialize: JSON.parse,
      },
    })
  );
