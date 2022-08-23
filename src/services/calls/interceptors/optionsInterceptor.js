import { createRequestInterceptor } from "../base-grpc/BaseGrpc.utils";
import { Options } from "../../../../util/gen/proto/commons/options_pb";

const defaultGrpcOptions = new Options()
  .setTimeoutMs(15000)
  .setMaxSizeBytes(10000)
  .toObject();

/**
 * Assigns default call options (request interceptor)
 */
export const optionsInterceptor = {
  grpc: createRequestInterceptor({
    handler: ({ request }) => {
      if (!request.options) request.options = defaultGrpcOptions;
    },
  }),
  api: () => {},
};
