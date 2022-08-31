import { createResponseInterceptor } from "../base-grpc/BaseGrpc.utils";

const getTimestamp = () => /.*[T](.*)[Z]/.exec(new Date().toISOString())[1];
const logger = (level, name, payload) =>
  console[level](
    `%c${getTimestamp()} %c${name}`,
    "font-size: 10px",
    "font-weight: bold",
    payload
  );

/**
 * Log calls to console (response interceptor)
 */
export const logInterceptor = {
  grpc: createResponseInterceptor({
    onUnaryResponse({ ctx, response }) {
      logger("log", ctx.name, { ...ctx, response });
    },
    onUnaryError({ ctx, error }) {
      logger("warn", `[error] ${ctx.name}`, { ...ctx, error });
    },
    onStreamStart({ ctx }) {
      logger("log", `[▶ stream start] ${ctx.name}`, ctx);
    },
    onStreamResponse({ ctx, response }) {
      if (response.status.statusCode === 0)
        logger("log", `[...streaming] ${ctx.name}`, { response });
      else logger("warn", `[...streaming] ${ctx.name}`, { response });
    },
    onStreamError({ ctx, error }) {
      logger("warn", `[stream error] ${ctx.name}`, {
        ...ctx,
        error,
      });
    },
    onStreamEnd({ ctx }) {
      logger("log", `[■ stream end] ${ctx.name}`, ctx);
    },
  }),
  api: (axiosInstance) =>
    axiosInstance.interceptors.response.use(
      (response) => {
        const name = response.config.url;
        logger("log", name, response);
        return response;
      },
      (error) => {
        const name = error.config.url;
        logger("warn", name, error);
        return Promise.reject(error);
      }
    ),
};
