import { createPinia } from "pinia";
import { usePersistedState } from "../plugins/persistedState";

export const pinia = createPinia();
usePersistedState(pinia);
