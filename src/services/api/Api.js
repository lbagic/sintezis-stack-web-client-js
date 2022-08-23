import { useAuthStore } from "../../modules/auth/store";
import { createApi } from "./base/BaseApi";

const authStore = useAuthStore();

export const Api = {
  snt: createApi({
    hostname: import.meta.env.VITE_SNT_API_ENDPOINT,
    getToken: () => authStore.token,
  }),
};
