import { GatewayController } from "@/gen/services/services_connectweb";
import {
  createGrpcWebTransport,
  createPromiseClient,
} from "@bufbuild/connect-web";
import { interceptors } from "./interceptors";

export const grpc = {
  snt: createPromiseClient(
    GatewayController,
    createGrpcWebTransport({
      baseUrl: "https://envoy.tip.elude.tech:443",
      interceptors: interceptors.map(({ grpc }) => grpc),
    })
  ),
};
