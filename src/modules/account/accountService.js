import { grpc } from "@/services/api/grpc";
import { createHash } from "@/utils/hash";
import { useAccountStore } from "./accountStore";

export const accountService = {
  login: async ({ email, password }) => {
    password = await createHash(password);
    const response = await grpc.AccountService.login({ email, password });
    const accountStore = useAccountStore();
    accountStore.token = response.token;
    accountStore.user = response.user;
    return response;
  },
};
