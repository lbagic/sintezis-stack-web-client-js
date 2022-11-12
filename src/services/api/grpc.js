import { GatewayController } from "@/gen/services/services_connectweb";
import { createGrpcPromiseClient } from "./base/grpcClientFactory";
import { grpcInterceptors } from "./interceptors";

const _grpc = createGrpcPromiseClient({
  services: {
    GatewayController,
  },
  baseUrl: import.meta.env.VITE_SNT_GRPC_URL,
  interceptors: grpcInterceptors,
});

export const grpc = {
  AccountService: {
    login: _grpc.GatewayController.login,
  },
  UserService: {
    add: _grpc.GatewayController.createUser,
    edit: _grpc.GatewayController.updateUser,
    get: _grpc.GatewayController.getUser,
    getAll: _grpc.GatewayController.getUsers,
    delete: _grpc.GatewayController.deleteUser,
  },
  AirlineService: {
    add: _grpc.GatewayController.createAirline,
    edit: _grpc.GatewayController.updateAirline,
    get: _grpc.GatewayController.getAirline,
    getAll: _grpc.GatewayController.getAirlines,
    delete: _grpc.GatewayController.deleteAirline,
  },
};
