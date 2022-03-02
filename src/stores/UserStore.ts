import { createStore } from "./core/storeFactory";

export const useUser = createStore({
  id: "store",
  state: () => ({
    counter: 0,
    users: [
      { id: 1, type: "odd" },
      { id: 2, type: "even" },
      { id: 3, type: "odd" },
      { id: 4, type: "even" },
    ],
  }),
  actions: {
    increment() {
      this.counter++;
    },
    getEntries() {
      fetch("https://api.publicapis.org/entries")
        .then((response) => response.json())
        .then((data) => console.log(data));
    },
  },
  persist: true,
});
