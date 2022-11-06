import { createInterceptor } from "./base/interceptorFactory";
import { useAuthStore } from "@/modules/auth/authStore";

const loggingInterceptor = createInterceptor({
  onResponse: ({ requestContext, responseContext }) =>
    console.log(
      `%c${requestContext.name}`,
      "color: mediumseagreen; font-weight: bold",
      { ...responseContext, request: requestContext }
    ),
  onRequestError: ({ error, requestContext }) =>
    console.warn(`%c${requestContext.name}`, "font-weight: bold", {
      ...error,
      request: requestContext,
    }),
  onResponseError: ({ error, requestContext }) =>
    console.warn(`%c${requestContext.name}`, "font-weight: bold", {
      ...error,
      request: requestContext,
    }),
});

const authInterceptor = createInterceptor({
  onRequest({ setHeader }) {
    const token = useAuthStore().token;
    if (token) setHeader("Authorization", `Bearer ${token}`);
  },
});

// TODO - logoutInterceptor
const interceptors = [authInterceptor, loggingInterceptor];

export const grpcInterceptors = interceptors.map((el) => el.grpc);
export const restInterceptors = interceptors.map((el) => el.rest);
