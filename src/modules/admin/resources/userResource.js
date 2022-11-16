import { User } from "@/gen/proto/models/user_pb";
import { GatewayController } from "@/gen/services/services_connectweb";
import { grpc } from "@/services/api/grpc";
import { createHash } from "@/utils/hash";
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
    prepare: async (user) => {
      const password = createHash(user.password);
      return {
        user: { ...user, password, authProviderId: 1 },
      };
    },
    parse: ({ user }) => user,
    rpc: GatewayController.methods.createUser,
    form: {
      firstName: {
        value: "",
        bind: { label: "First Name", required: true },
      },
      lastName: {
        value: "",
        bind: { label: "Last Name", required: true },
      },
      titleId: {
        value: "",
        bind: { label: "Title", required: true },
      },
      email: {
        value: "",
        bind: { label: "Email", required: true },
      },
      password: {
        value: "",
        bind: { label: "Password", required: true },
      },
      dateOfBirth: {
        value: "",
        bind: { label: "Date of birth", type: "date", required: true },
      },
      phone: {
        value: "",
        bind: { label: "Phone" },
      },
      address: {
        value: "",
        bind: { label: "Address" },
      },
      airportId: {
        value: "",
        bind: { label: "Airport" },
      },
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
