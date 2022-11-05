import { createInterceptor } from "./base/interceptorFactory";

const loggingInterceptor = createInterceptor({
  // onRequest: (req) => console.log(`%c${req.info.name}`, "font-size: 10px", req),
  onResponse: (res, req) =>
    console.log(
      `%c${req.info.name}`,
      "color: mediumseagreen; font-weight: bold",
      {
        ...res,
        request: req,
      }
    ),
  onRequestError: (err, req) =>
    console.warn(`%c${req.info.name}`, "font-weight: bold", {
      ...err,
      request: req,
    }),
  onResponseError: (err, req) =>
    console.warn(`%c${req.info.name}`, "font-weight: bold", {
      ...err,
      request: req,
    }),
});

// TODO:
// authorization
// unauthorized
// notification
const interceptors = [loggingInterceptor];

export const grpcInterceptors = interceptors.map((el) => el.grpc);
export const restInterceptors = interceptors.map((el) => el.rest);
