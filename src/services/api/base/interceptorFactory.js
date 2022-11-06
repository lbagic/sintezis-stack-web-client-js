/**
 * Request/Response context types
 * @typedef {{
 *  data: any
 *  headers: Record<string, string>
 *  metadata: any
 *  method: string
 *  name: string
 *  query: string
 *  stream: boolean
 *  url: string
 * }} RequestContext
 * @typedef {{
 *  data: any
 *  headers: Record<string, string>
 *  metadata: any
 * }} ResponseContext
 *
 * Request/Response types
 * @typedef { import("@bufbuild/connect-web").UnaryRequest<import("@bufbuild/protobuf").AnyMessage> } GrpcRequestObject
 * @typedef { import("@bufbuild/connect-web").UnaryResponse<import("@bufbuild/protobuf").AnyMessage> | import("@bufbuild/connect-web").StreamResponse<import("@bufbuild/protobuf").AnyMessage> } GrpcResponseObject
 * @typedef { import("axios").AxiosRequestConfig<any> } RestRequestObject
 * @typedef { import("axios").AxiosRequestConfig<any> } RestResponseObject
 * @typedef { (key: string, value: string) => void } SetRequestHeader
 *
 * Interceptor types
 * @typedef { [(value: RestRequestObject) => RestRequestObject, (error: any) => any] } RestRequstInterceptor
 * @typedef { [(value: RestResponseObject) => RestResponseObject, (error: any) => any] } RestResponseInterceptor
 * @typedef {{ request: RestRequstInterceptor, response: RestResponseInterceptor }} RestInterceptor
 * @typedef { import("@bufbuild/connect-web").Interceptor } GrpcInterceptor
 * */

/**
 * @param { GrpcRequestObject } request
 * @returns { RequestContext }
 */
const grpcRequestContext = (request) => ({
  data: request.message,
  headers: Object.fromEntries(request.header.entries()),
  metadata: request.metadata,
  method: request.init.method,
  name: request.method.name,
  query: "",
  stream: request.stream,
  url: request.url,
});

/**
 * @param { GrpcResponseObject } response
 * @returns { ResponseContext }
 */
const grpcResponseContext = (response) => ({
  data: response.message,
  headers: Object.fromEntries(response.header.entries()),
  metadata: response.metadata,
});

/**
 * @param { RestRequestObject } request
 * @returns { RequestContext }
 */
const restRequestContext = (request) => {
  const [name, query] = request.url.split("?");
  const url = request.baseURL + request.url;
  const method = request.method.toUpperCase();
  return {
    data: request.data,
    headers: request.headers.common,
    metadata: request.metadata,
    method,
    name: `${method} ${name}`,
    query: `?${query}`,
    stream: false,
    url,
  };
};

/**
 * @param { RestResponseObject } response
 * @returns { ResponseContext }
 */
const restResponseContext = (response) => ({
  data: response.data,
  headers: response.headers,
  metadata: response.metadata,
});

/**
 *
 * @param {{
 *  onRequest: (data: {requestContext: RequestContext, setHeader: SetRequestHeader }) => RequestContext | undefined
 *  onRequestError: (data: { error: Error, requestContext: RequestContext }) => void
 *  onResponse: (data: { requestContext: RequestContext, responseContext: ResponseContext }) => void
 *  onResponseError: (data: { error: Error, requestContext: RequestContext }) => void
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
  onRequestError,
  onResponse,
  onResponseError,
}) => ({
  grpc: (next) => async (request) => {
    const requestContext = grpcRequestContext(request);
    const setHeader = (key, value) => request.header.set(key, value);
    try {
      onRequest?.({ requestContext, setHeader });
    } catch (error) {
      onRequestError?.({ error, requestContext });
      throw error;
    }
    try {
      const response = await next(request);
      const responseContext = grpcResponseContext(response);
      onResponse?.({ requestContext, responseContext });
      // TODO - handle stream logging
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
      return response;
    } catch (error) {
      onRequestError?.({ error, requestContext });
      throw error;
    }
  },
  rest: {
    request: [
      (request) => {
        const requestContext = restRequestContext(request);
        const setHeader = (key, value) => (request.headers.common[key] = value);
        onRequest?.({ requestContext, setHeader });
        return request;
      },
      (error) => {
        const requestContext = restRequestContext(error.config);
        onRequestError?.({ error, requestContext });
        return Promise.reject(error);
      },
    ],
    response: [
      (response) => {
        const request = response.config;
        const responseContext = restResponseContext(response);
        const requestContext = restRequestContext(request);
        onResponse?.({ requestContext, responseContext });
        return response;
      },
      (error) => {
        const requestContext = restRequestContext(error.config);
        onResponseError?.({ error, requestContext });
        return Promise.reject(error);
      },
    ],
  },
});
