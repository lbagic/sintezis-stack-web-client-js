import { router } from "@/app/router";
import type { PiniaPluginContext } from "pinia";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { markRaw } from "vue";
import type { Router } from "vue-router";

export const pinia = createPinia();

function piniaPluginResetstate({ store, options }: PiniaPluginContext) {
  type State = (typeof store)["$state"];
  type Reset = Record<keyof State, () => void>;

  const reset: Reset = {};
  Object.keys(store.$state).forEach((key) => {
    reset[key] = () => (store.$state[key] = options.state?.()?.[key]);
  });
  return { reset };
}

pinia.use(piniaPluginPersistedstate);
pinia.use(piniaPluginResetstate);
pinia.use(({ store }) => {
  store.router = markRaw(router);
});

declare module "pinia" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export interface PiniaCustomProperties<Id, S, G, A> {
    // @ts-ignore
    reset: { [K in keyof this["$state"]]: () => void };
    router: Router;
  }
}
