import { User } from "@/gen/proto/models/user_pb";
import { GatewayController } from "@/gen/services/services_connectweb";
import { grpc } from "@/services/api/grpc";
import { createResource } from "./base/resourceFactory";

export const userResource = createResource({
  entity: User,
  usePagination: true,
  getAll: {
    call: grpc.UserService.getAll,
    parse: ({ users }) => users,
    rpc: GatewayController.methods.getUsers,
  },
  create: {
    call: grpc.UserService.add,
    prepare: (user) => ({ user: { ...user, authProviderId: 1 } }),
    parse: ({ user }) => user,
    rpc: GatewayController.methods.createUser,
    form: {
      firstName: { value: "", bind: { label: "First Name", required: true } },
    },
  },
  mapDisplayItem: (obj = {}) => ({
    id: obj.id,
    Address: obj.address,
    Name: obj.firstName,
  }),
  // createForm: {
  //   firstName: { value: "", map: (o) => o.fir },
  //   title: { value: "", bind: {} },
  //   roles: [{}],
  // },
});
