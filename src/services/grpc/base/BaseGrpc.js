import { GatewayControllerPromiseClient } from "../../../../util/gen/services/services_grpc_web_pb";
import {
  optionsInterceptor,
  authInterceptor,
  debugInterceptor,
  unauthorizedInterceptor,
  notificationInterceptor,
} from "./BaseGrpc.interceptors";
import {
  resolveGrpcRequestContext,
  resolveGrpcCallContext,
} from "./BaseGrpc.utils";

/**
 * Bundles multiple interceptors and outputs one interceptor.
 */
const bundleInterceptors = (getToken, callMap) => ({
  intercept(req, invoker) {
    const token = getToken?.();
    const requestContext = resolveGrpcRequestContext(req, token);

    optionsInterceptor(requestContext);
    authInterceptor(requestContext);

    // Initiate grpc call
    const callContext = resolveGrpcCallContext({
      callMap,
      requestContext,
      invoker,
      req,
    });

    if (!callContext.isDuplicateCall) {
      debugInterceptor(callContext);
      if (callContext.options.useToasts) notificationInterceptor(callContext);
    }
    if (token) unauthorizedInterceptor(callContext);

    return callContext.call;
  },
});

/**
 * Creates a grpc instance.
 *
 * @param {{
 *  hostname: String,
 *  getToken: () => String,
 * }} config Decsripton.
 * @returns { GatewayControllerPromiseClient } Return description.
 */
export const createGrpc = (config) => {
  const { getToken, hostname } = config;
  if (!hostname) throw new Error("Grpc hostname is missing.");

  const callMap = new Map();
  const interceptor = bundleInterceptors(getToken, callMap);
  const interceptors = {
    unaryInterceptors: [interceptor],
    streamInterceptors: [interceptor],
  };

  return new GatewayControllerPromiseClient(hostname, undefined, interceptors);
};