import { GatewayController } from "@/gen/services/services_connectweb";
import {
  createGrpcWebTransport,
  createPromiseClient,
} from "@bufbuild/connect-web";
import { grpcInterceptors } from "../api-interceptors/interceptors";

export const grpc = {
  snt: createPromiseClient(
    GatewayController,
    createGrpcWebTransport({
      baseUrl: "https://envoy.tip.elude.tech:443",
      interceptors: grpcInterceptors,
    })
  ),
};

// grpc.snt.getLocations();
// grpc.snt.getUsers();
