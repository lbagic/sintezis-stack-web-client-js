import { router } from "@/app/router";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { markRaw } from "vue";
import type { Router } from "vue-router";

export const pinia = createPinia();

// Plugin - persisted state
pinia.use(piniaPluginPersistedstate);

// Plugin - rotuer
pinia.use(({ store }) => {
  store.router = markRaw(router);
});

// Plugin - reset
pinia.use(({ store, options }) => {
  const reset = Object.keys(store.$state).reduce((o, key) => {
    // o[key] = () => store.$patch({ [key]: options.state?.()[key] });
    o[key] = () => (store.$state[key] = options.state?.()[key]);
    return o;
  }, {} as Record<keyof typeof store.$state, () => void>);
  if (import.meta.env.DEV) store._customProperties.add("reset");
  return { reset };
});

// Type definitions for store
declare module "pinia" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export interface PiniaCustomProperties<Id, S, G, A> {
    reset: { [K in keyof S]: () => void };
    router: Router;
  }
}
