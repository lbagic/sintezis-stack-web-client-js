import { AccountService } from "@/gen/account_connectweb";
import { BunkerPriceStatusService } from "@/gen/bunkerpricestatus_connectweb";
import { BunkerPriceService } from "@/gen/bunkerprice_connectweb";
import { OrderService } from "@/gen/order_connectweb";
import { PermissionService } from "@/gen/permission_connectweb";
import { RoleService } from "@/gen/role_connectweb";
import { UserService } from "@/gen/user_connectweb";
import { createGrpcPromiseClient } from "./base/grpcClientFactory";
import { grpcInterceptors } from "./interceptors";

export const grpc = createGrpcPromiseClient({
  services: {
    AccountService,
    BunkerPriceStatusService,
    BunkerPriceService,
    OrderService,
    PermissionService,
    RoleService,
    UserService,
  },
  useEnvoyProxy: false,
  baseUrl: import.meta.env.VITE_SNT_GRPC_URL,
  interceptors: grpcInterceptors,
});
