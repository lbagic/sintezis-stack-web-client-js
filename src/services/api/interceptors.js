const createInterceptor = ({ onRequest, onResponse, onError }) => ({
  grpc: (next) => async (req) => {
    onRequest?.(req);
    const res = await next(req);
    onResponse?.(res);
    return res;
  },
  rest: {
    request: [
      (req) => {
        onRequest?.(req);
        return req;
      },
    ],
    response: [
      (req) => {
        onResponse?.(req);
        return req;
      },
      (err) => {
        onError?.(err);
        return Promise.reject(err);
      },
    ],
  },
});

const logging = createInterceptor({
  onRequest: (req) => console.log("%c○", "color: #00000044", req),
  onResponse: (res) => console.log("%c○", "color: green", res),
  onError: (err) => console.log("%c○", "color: red", err),
});
// authorization
// logging
// unauthorized
// notification

export const interceptors = [logging];
