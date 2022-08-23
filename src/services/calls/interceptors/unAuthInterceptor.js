import { createResponseInterceptor } from "../base-grpc/BaseGrpc.utils";

/**
 * Logs out users on session expiry (response interceptor)
 */
export const unAuthInterceptor = {
  grpc: createResponseInterceptor({
    // onError({ error }) {
    //   if (error?.code === 7 || error?.code === 16) router.push("/logout");
    // },
  }),
  api: () => {},
};
