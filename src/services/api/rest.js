import { createRestPromiseClient } from "./base/restClientFactory";
import { restInterceptors } from "./interceptors";

export const rest = createRestPromiseClient({
  baseURL: import.meta.env.VITE_SNT_API_URL,
  interceptors: restInterceptors,
});
