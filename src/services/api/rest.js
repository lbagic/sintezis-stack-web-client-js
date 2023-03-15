import { createRestPromiseClient } from "@/services/api/base/restClientFactory";
import { restInterceptors } from "@/services/api/interceptors";

export const rest = createRestPromiseClient({
  baseURL: import.meta.env.VITE_SNT_API_URL,
  interceptors: restInterceptors,
});
