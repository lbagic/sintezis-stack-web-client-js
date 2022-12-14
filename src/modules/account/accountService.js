import { grpc } from "@/services/api/grpc";
import { createHash } from "@/utils/hash";

export const accountService = {
  /** @type { typeof grpc.AccountService.login } */
  login: async (request) => {
    const password = await createHash(request.password);
    return grpc.AccountService.login({ ...request, password });
  },
};
