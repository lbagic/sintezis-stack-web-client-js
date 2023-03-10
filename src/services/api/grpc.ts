import { AccountService } from "@buf/sintezis_reti.bufbuild_connect-web/account_connectweb";
import { PermissionService } from "@buf/sintezis_reti.bufbuild_connect-web/permission_connectweb";
import { RoleService } from "@buf/sintezis_reti.bufbuild_connect-web/role_connectweb";
import { UserService } from "@buf/sintezis_reti.bufbuild_connect-web/user_connectweb";
import { createGrpcClient } from "./base/grpcClientFactory";
import { grpcInterceptors } from "./interceptors";

export const grpc = createGrpcClient({
  services: {
    AccountService,
    PermissionService,
    RoleService,
    UserService,
  },
  options: {
    baseUrl: import.meta.env.VITE_SNT_GRPC_URL,
    interceptors: grpcInterceptors,
  },
});
