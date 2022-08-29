import { useAuthStore } from "../../modules/auth/store";
import { createApi } from "./base-api/BaseApi";

export const Api = {
  snt: createApi({
    baseURL: import.meta.env.VITE_SNT_API_ENDPOINT,
    getToken: () => useAuthStore().token,
  }),
};
