import { createInterceptor } from "./interceptorFactory";

const logging = createInterceptor({
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
// authorization
// logging
// unauthorized
// notification
const _interceptors = [logging];

export const grpcInterceptors = _interceptors.map((el) => el.grpc);
export const restInterceptors = _interceptors.map((el) => el.rest);
