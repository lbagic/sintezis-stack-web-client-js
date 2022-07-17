import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";

export const pinia = createPinia();

pinia.use(
  createPersistedState({
    storage: localStorage,
    serializer: {
      serialize: JSON.stringify,
      deserialize: JSON.parse,
    },
  })
);
