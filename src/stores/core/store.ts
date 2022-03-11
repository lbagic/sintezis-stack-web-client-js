import { createPinia } from "pinia";
// import secureLs from "secure-ls";
import { debouncePlugin } from "../plugins/debouncePlugin";
import { persistPlugin } from "../plugins/persistPlugin";

// const ls = new secureLs();
// const storage = {
//   getItem: (key: string) => ls.get(key),
//   setItem: (key: string, value: unknown) => ls.set(key, value),
// };
export const pinia = createPinia().use(debouncePlugin).use(persistPlugin);
