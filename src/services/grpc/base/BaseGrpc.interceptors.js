import { useRouter } from "vue-router";
import { Options } from "../../../../util/gen/proto/commons/options_pb";
import { toast } from "../../../components/base/toast.ctl";

import {
  createRequestInterceptor,
  createResponseInterceptor,
} from "./BaseGrpc.utils";

const router = useRouter();
const re = /.*[T](.*)[Z]/;
const getTimestamp = () => re.exec(new Date().toISOString())[1];
const logger = (level, name, payload) =>
  console[level](
    `%c${getTimestamp()} %c${name}`,
    "font-size: 10px",
    "font-weight: bold",
    payload
  );
const defaultOptions = new Options()
  .setTimeoutMs(15000)
  .setMaxSizeBytes(10000)
  .toObject();

/**
 * Options interceptor (request interceptor).
 * Used for assigning default grpc options to all requests.
 */
export const optionsInterceptor = createRequestInterceptor({
  handler: ({ request }) => {
    if (!request.options) request.options = defaultOptions;
  },
});

/**
 * Auth interceptor (request interceptor).
 * Used for automatic firing of toasts on error/success responses.
 */
export const authInterceptor = createRequestInterceptor({
  handler: ({ token, metadata }) => {
    if (token && !metadata.Authorization)
      metadata.Authorization = `Bearer ${token}`;
  },
});

/**
 * Unauthorized (session expired) interceptor.
 * Used for logging out user on session expired/unauthorized requests.
 */
export const unauthorizedInterceptor = createResponseInterceptor({
  onError({ error }) {
    if (error?.code === 7 || error?.code === 16) router.push("/logout");
  },
});

/**
 * Notification interceptor.
 * Used for automatic firing of toasts on error/success responses.
 */
export const notificationInterceptor = createResponseInterceptor({
  onUnaryResponse({ ctx }) {
    toast.success(ctx.name);
  },
  onError({ error }) {
    const messages = error?.message.split("|");
    const [type, userMessage, debugMessage] = messages;
    if (type && userMessage && debugMessage) toast.error(userMessage);
  },
});

/**
 * Debug interceptor.
 * Used for logging grpc calls to console for easier debugging.
 */
export const debugInterceptor = createResponseInterceptor({
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
});
