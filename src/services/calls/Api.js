import { useAuthStore } from "../../modules/auth/store";
import { createApi } from "./base-api/BaseApi";

const authStore = useAuthStore();

export const Api = {
  snt: createApi({
    baseURL: import.meta.env.VITE_SNT_API_ENDPOINT,
    getToken: () => authStore.token,
  }),
};
