import {
  createConnectTransport,
  createPromiseClient,
} from "@bufbuild/connect-web";
import { GatewayController } from "../../gen/services/services_connectweb";

const transport = createConnectTransport({
  baseUrl: "https://demo.connect.build",
});

const grpc = createPromiseClient(GatewayController, transport);

export const exampleGrpcService = {
  login: grpc.login,
  register: grpc.register,
};
