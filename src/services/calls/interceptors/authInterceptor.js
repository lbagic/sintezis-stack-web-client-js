import { createRequestInterceptor } from "../base-grpc/BaseGrpc.utils";

/**
 * Assisgns auth token to calls (request interceptor)
 */
export const authInterceptor = {
  grpc: createRequestInterceptor({
    handler: ({ token, metadata }) => {
      if (token && !metadata.Authorization)
        metadata.Authorization = `Bearer ${token}`;
    },
  }),
  api: (axiosInstance, { getToken }) =>
    axiosInstance.interceptors.request.use(
      (config) => {
        const token = getToken();
        if (token) config.headers = { Authorization: `Bearer ${token}` };
        return config;
      },
      (error) => Promise.reject(error)
    ),
};
