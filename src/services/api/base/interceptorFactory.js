/**
 * @typedef {{
 *  data: any,
 *  info: {
 *    headers: Record<string, string>,
 *    method: string,
 *    name: string,
 *    query: string,
 *    stream: boolean,
 *    uid: string,
 *    url: string,
 *  }
 * }} RequestContext
 *
 * @typedef {{
 *  data: any,
 *  info: {
 *    headers: Record<string, string>,
 *  }
 * }} ResponseContext
 * */

/** @returns { RequestContext } */
const grpcRequestContext = (req) => {
  if (!req._meta) {
    req._meta = {
      data: req.message,
      info: {
        headers: req.header,
        method: req.init.method,
        name: req.method.name,
        query: "",
        stream: req.stream,
        uid: `${req.init.method}-${req.url}-${JSON.stringify(
          req.header
        )}-${JSON.stringify(req.message)}`,
        url: req.url,
      },
    };
  }
  return req._meta;
};

/** @returns { ResponseContext } */
const grpcResponseContext = (res) => {
  if (!res._meta) {
    res._meta = {
      data: res.message,
      info: {
        headers: res.header,
      },
    };
  }
  return res._meta;
};

/** @returns { RequestContext } */
const restRequestContext = (req) => {
  if (!req._meta) {
    const [name, query] = req.url.split("?");
    const url = req.baseURL + req.url;
    const method = req.method.toUpperCase();
    req._meta = {
      data: req.data,
      info: {
        headers: req.headers.common,
        method,
        name: `${method} ${name}`,
        query: `?${query}`,
        stream: false,
        uid: `${req.method}-${url}-${JSON.stringify(req.data)}-${JSON.stringify(
          req.headers.common
        )}`,
        url,
      },
    };
  }
  return req._meta;
};

/** @returns { ResponseContext } */
const restResponseContext = (res) => {
  if (!res._meta) {
    res._meta = {
      data: res.data,
      info: {
        headers: res.headers,
      },
    };
  }
  return res._meta;
};

// [(value: AxiosRequestConfig<any>) => AxiosRequestConfig<any> | Promise<AxiosRequestConfig<any>>, (error: any) => any]
/**
 * @typedef { [(value: import("axios").AxiosRequestConfig<any>) => import("axios").AxiosRequestConfig<any> | Promise<import("axios").AxiosRequestConfig<any>>, (error: any) => any] } RestRequstInterceptor
 * @typedef { [(value: AxiosResponse<any, any>) => AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>, (error: any) => any] } RestResponseInterceptor
 * @typedef {{ request: RestRequstInterceptor, response: RestResponseInterceptor }} RestInterceptor
 * @typedef { import("@bufbuild/connect-web").Interceptor } GrpcInterceptor
 * @param {{
 *  onRequest: (req: RequestContext) => void
 *  onRequestError: (err: Error, req: RequestContext) => void
 *  onResponse: (res: ResponseContext, req: RequestContext) => void
 *  onResponseError: (err: Error, req: RequestContext) => void
 * }}
 * @returns {{
 *  grpc: GrpcInterceptor
 *  rest: {
 *    request: RestRequstInterceptor,
 *    response: RestResponseInterceptor
 *  }
 * }}
 */
export const createInterceptor = ({
  onRequest,
  onResponse,
  onRequestError,
  onResponseError,
}) => ({
  grpc: (next) => async (req) => {
    const reqCtx = grpcRequestContext(req);
    try {
      onRequest?.(reqCtx);
    } catch (err) {
      onRequestError?.(err, reqCtx);
      throw err;
    }
    try {
      const res = await next(req);
      const resCtx = grpcResponseContext(res);
      onResponse?.(resCtx, reqCtx);
      // if (res.stream)
      //   return {
      //     ...res,
      //     async read() {
      //       const msg = await res.read();
      //       onRequest(res);
      //       onResponse(msg);
      //       return msg;
      //     },
      //   };
      return res;
    } catch (err) {
      onResponseError?.(err, reqCtx);
      throw err;
    }
  },
  rest: {
    request: [
      (req) => {
        const reqCtx = restRequestContext(req);
        onRequest?.(reqCtx);
        return req;
      },
      (err) => {
        onRequestError?.(err);
        return Promise.reject(err);
      },
    ],
    response: [
      (res) => {
        const resCtx = restResponseContext(res);
        const req = res.config;
        const reqCtx = restRequestContext(req);
        onResponse?.(resCtx, reqCtx);
        return res;
      },
      (err) => {
        const reqCtx = restRequestContext(err.config);
        onResponseError?.(err, reqCtx);
        return Promise.reject(err);
      },
    ],
  },
});
