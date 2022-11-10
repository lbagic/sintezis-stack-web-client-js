import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";

export const pinia = createPinia();

// Persist state plugin
pinia.use(
  createPersistedState({
    storage: localStorage,
    serializer: {
      serialize: JSON.stringify,
      deserialize: JSON.parse,
    },
  })
);

// Reset plugin
pinia.use(({ store, options }) => {
  const reset = Object.keys(store.$state).reduce((o, key) => {
    o[key] = () => store.$patch({ [key]: options.state()[key] });
    return o;
  }, {});
  if (import.meta.env.DEV) store._customProperties.add("reset");
  return { reset };
});
