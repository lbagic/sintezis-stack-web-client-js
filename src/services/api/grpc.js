import { GatewayController } from "@/gen/services/services_connectweb";
import { createGrpcPromiseClient } from "./base/grpcClientFactory";
import { grpcInterceptors } from "./interceptors";

export const grpc = {
  snt: createGrpcPromiseClient({
    service: GatewayController,
    baseUrl: import.meta.env.VITE_SNT_GRPC_URL,
    interceptors: grpcInterceptors,
  }),
};
