import { User } from "@/gen/proto/models/user_pb";
import { GatewayController } from "@/gen/services/services_connectweb";
import { grpc } from "@/services/api/grpc";
import { createHash } from "@/utils/hash";
import { createResource } from "./base/resourceFactory";

export const userResource = createResource({
  entity: User,
  usePagination: false,
  tableColumns: [
    { label: "First Name", field: "firstName" },
    { label: "Last Name", field: "lastName" },
  ],
  services: {
    getAll: {
      rpc: GatewayController.methods.getUsers,
      call: grpc.UserService.getAll,
    },
    create: {
      rpc: GatewayController.methods.createUser,
      call: async (request) => {
        request.user.password = await createHash(request.user.password);
        return grpc.UserService.add(request);
      },
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
          value: "asdf",
          bind: {
            label: "Airport",
            options: () => grpc.AirlineService.getAll({}),
            required: true,
          },
        },
      },
    },
  },
});
