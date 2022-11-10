import { createInterceptor } from "./base/interceptorFactory";
import { useAccountStore } from "@/modules/account/accountStore";

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
    const { token } = useAccountStore();
    if (token) setHeader("Authorization", `Bearer ${token}`);
  },
});

const transformErrorInterceptor = createInterceptor({
  onResponseError: ({ error, errorContext }) => {
    Object.assign(error, { meta: errorContext });
  },
});

// TODO - logoutInterceptor
const interceptors = [
  authInterceptor,
  loggingInterceptor,
  transformErrorInterceptor,
];

export const grpcInterceptors = interceptors.map((el) => el.grpc);
export const restInterceptors = interceptors.map((el) => el.rest);
