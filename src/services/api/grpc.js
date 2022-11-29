import { GatewayController } from "@/gen/services/services_connectweb";
import { createGrpcPromiseClient } from "./base/grpcClientFactory";
import { grpcInterceptors } from "./interceptors";

export const GrpcServices = {
  AccountService: {
    typeName: GatewayController.typeName,
    methods: {
      login: GatewayController.methods.login,
    },
  },
  UserService: {
    typeName: GatewayController.typeName,
    methods: {
      add: GatewayController.methods.createUser,
      edit: GatewayController.methods.updateUser,
      get: GatewayController.methods.getUser,
      getAll: GatewayController.methods.getUsers,
      delete: GatewayController.methods.deleteUser,
    },
  },
  AirlineService: {
    typeName: GatewayController.typeName,
    methods: {
      add: GatewayController.methods.createAirline,
      edit: GatewayController.methods.updateAirline,
      get: GatewayController.methods.getAirline,
      getAll: GatewayController.methods.getAirlines,
      delete: GatewayController.methods.deleteAirline,
    },
  },
  CountryService: {
    typeName: GatewayController.typeName,
    methods: {
      getAll: GatewayController.methods.getCountries,
    },
  },
};

export const grpc = createGrpcPromiseClient({
  services: GrpcServices,
  useEnvoyProxy: true,
  baseUrl: import.meta.env.VITE_SNT_GRPC_URL,
  interceptors: grpcInterceptors,
});
