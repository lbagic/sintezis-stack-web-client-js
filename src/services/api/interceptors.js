import { useAccountService } from "@/modules/account/accountService";
import { createInterceptor } from "./base/interceptorFactory";

const loggingInterceptor = createInterceptor({
  // onRequest: ({ requestContext }) =>
  //   console.log(`%c${requestContext.name}`, "font-size: 10px", {
  //     request: requestContext,
  //   }),
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
    const account = useAccountService();
    if (account.token) setHeader("Authorization", `Bearer ${account.token}`);
  },
});

const transformInterceptor = createInterceptor({
  onRequest: ({ request, requestContext }) => {
    if (requestContext.type === "grpc") {
      const fields = request.method.I.fields.list();
      const pagination = fields.find((el) => el.name === "pagination");
      if (pagination && !request.message.pagination)
        request.message.pagination = new pagination.T({
          overridePagination: true,
        });
    }
  },
  onResponseError: ({ error, errorContext }) => {
    Object.assign(error, { meta: errorContext });
  },
  onResponse: ({ response, requestContext }) => {
    if (requestContext.type === "grpc") {
      response.message = response.message.toJson();
    }
  },
});

// TODO - logoutInterceptor
const interceptors = [
  authInterceptor,
  loggingInterceptor,
  transformInterceptor,
];

export const grpcInterceptors = interceptors.map((el) => el.grpc);
export const restInterceptors = interceptors.map((el) => el.rest);
