import { grpc } from "@/services/api/grpc";
import { createHash } from "@/utils/hash";
import { useAccountStore } from "./accountStore";

export const accountService = {
  login: async ({ email, password }) => {
    password = await createHash(password);
    const promise = grpc.AccountService.login({ email, password });
    promise.then(({ token, user }) => {
      const accountStore = useAccountStore();
      accountStore.token = token;
      accountStore.user = user;
    });
    return promise;
  },
};
