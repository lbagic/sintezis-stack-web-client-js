/**
 * Resolves grpc request context.
 *
 * @typedef {{
 *  name: string,
 *  request: object,
 *  metadata: object,
 *  options: GrpcOptions
 *  token: string,
 * }} GrpcRequestContext
 *
 * @param { any } req Grpc request object.
 * @param { string } token Grpc request object.
 * @return { GrpcRequestContext } Returns request context.
 */

export function resolveGrpcRequestContext(req, token) {
  const { name } = req.getMethodDescriptor();
  const request = req.getRequestMessage().toObject();
  const metadata = req.getMetadata();
  const options = metadata.options || {};
  delete metadata.options;

  return {
    name: name.slice(name.lastIndexOf("/") + 1),
    request,
    metadata,
    options,
    token,
  };
}

/**
 * Resolves grpc request context & deduplicates calls (consolidates multiple identical calls into one call).
 *
 * @typedef {{
 *  call: any,
 *  isDuplicateCall: boolean,
 *  isStream: boolean,
 * } & GrpcRequestContext } GrpcCallContext
 *
 * @return { GrpcCallContext } Returns request context.
 */

export function resolveGrpcCallContext({
  req,
  invoker,
  requestContext,
  callMap,
}) {
  const key = JSON.stringify(requestContext);
  const savedCall = callMap.get(key);
  const call = savedCall || invoker(req);
  const isStream = typeof call?.on === "function";

  if (!isStream) {
    if (!savedCall) callMap.set(key, call);
    const deleteEntry = () => callMap.delete(key);
    call?.catch?.(() => {}).finally?.(deleteEntry);
    call?.on?.("end", deleteEntry);
    call?.on?.("error", deleteEntry);
  }

  return { call, isDuplicateCall: !!savedCall, isStream, ...requestContext };
}

/**
 * Create response interceptor.
 *
 * @param  {{
 *  onStart: (data: { ctx: GrpcCallContext }) => {},
 *  onResponse: (data: { ctx: GrpcCallContext, response: {} }) => {},
 *  onEnd: (data: { ctx: GrpcCallContext }) => {},
 *  onError: (data: { ctx: GrpcCallContext, error: Error }) => {},
 *  onStreamStart: (data: { ctx: GrpcCallContext }) => {},
 *  onStreamResponse: (data: { ctx: GrpcCallContext, response: {} }) => {},
 *  onStreamError: (data: { ctx: GrpcCallContext, error: Error }) => {},
 *  onStreamEnd: (data: { ctx: GrpcCallContext }) => {},
 *  onUnaryStart: (data: { ctx: GrpcCallContext }) => {},
 *  onUnaryResponse: (data: { ctx: GrpcCallContext, response: {} }) => {},
 *  onUnaryError: (data: { ctx: GrpcCallContext, error: Error }) => {},
 *  onUnaryEnd: (data: { ctx: GrpcCallContext }) => {},
 * }} hooks Response interceptors
 *
 * @return { (callContext: GrpcCallContext) => void }
 *
 */

export const createResponseInterceptor = (hooks) => (ctx) => {
  if (hooks.onStart) hooks.onStart({ ctx });
  if (ctx.isStream) {
    if (hooks.onStreamStart) hooks.onStreamStart({ ctx });
    if (hooks.onResponse || hooks.onStreamResponse)
      ctx.call.on("data", (res) => {
        const payload = { ctx, response: res.toObject() };
        hooks.onResponse?.(payload);
        hooks.onStreamResponse?.(payload);
      });
    if (hooks.onStreamError || hooks.onError)
      ctx.call.on("error", (error) => {
        hooks.onStreamError?.({ ctx, error });
        hooks.onError?.({ ctx, error });
      });
    if (hooks.onStreamEnd || hooks.onEnd)
      ctx.call.on("end", () => {
        hooks.onStreamEnd?.({ ctx });
        hooks.onEnd?.({ ctx });
      });
  } else {
    if (hooks.onUnaryStart) hooks.onUnaryStart({ ctx });
    if (hooks.onResponse || hooks.onUnaryResponse)
      ctx.call
        .then((res) => {
          const payload = {
            ctx,
            response: res.getResponseMessage().toObject(),
          };
          hooks.onResponse?.(payload);
          hooks.onUnaryResponse?.(payload);
        })
        .catch(() => {});
    if (hooks.onError || hooks.onUnaryError)
      ctx.call.catch((error) => {
        hooks.onUnaryError?.({ ctx, error });
        hooks.onError?.({ ctx, error });
      });
    if (hooks.onEnd || hooks.onUnaryEnd)
      ctx.call.finally(() => {
        hooks.onUnaryEnd?.({ ctx });
        hooks.onEnd?.({ ctx });
      });
  }
};

/**
 * Create request interceptor.
 *
 * @param  {{
 *  handler: (ctx: GrpcRequestContext) => {},
 * }} hook Request interceptor
 *
 * @return { (requestContext: GrpcRequestContext) => void }
 */
export const createRequestInterceptor = (hook) => (ctx) => hook.handler(ctx);
