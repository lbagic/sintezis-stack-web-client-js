import { grpc } from "@/services/api/grpc";
import { createHash } from "@/utils/hash";
import { useAuthStore } from "./authStore";

export const authService = {
  login: async ({ email, password }) => {
    password = await createHash(password);
    const promise = grpc.login({ email, password });
    promise.then(({ token, user }) => {
      const authStore = useAuthStore();
      authStore.token = token;
      authStore.user = user;
    });
    return promise;
  },
};
