import { generateStore } from "./core/storeFactory";

export const useUserStore = generateStore({
  id: "user",
  state: () => ({
    users: [
      { id: 1, type: "odd" },
      { id: 2, type: "even" },
      { id: 3, type: "odd" },
      { id: 4, type: "even" },
    ],
  }),
});

const userStore = useUserStore();
userStore.users;
userStore.usersAdd({ id: 5, type: "new" });
userStore.usersFind({});
userStore.usersFindMany({ type: "odd" });
userStore.usersRemove({ type: "even" });
userStore.usersReset();
