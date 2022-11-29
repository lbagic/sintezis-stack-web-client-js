// @ts-check

import { useFormConfig } from "@/components/base/input/input.ctl";
import { User } from "@/gen/proto/models/user_pb";
import { grpc, GrpcServices } from "@/services/api/grpc";
import { createHash } from "@/utils/hash";
import { createResource } from "./base/resourceFactory";

export const userResource = createResource({
  entity: User,
  rpc: GrpcServices.UserService.methods,
  usePagination: false,
  useDetails: true,
  // tableColumns: [
  //   { label: "First Name", field: "firstName" },
  //   { label: "Last Name", field: "lastName" },
  // ],
  setupGetAllContext() {
    return { call: grpc.UserService.getAll };
  },
  setupAddContext() {
    const nameOptions = $ref(["Luka"]);
    const form = useFormConfig(
      {
        firstName: {
          value: "",
          label: "First Name",
          required: true,
          onSearch: (value) => nameOptions.push(`${value} Testing`),
          options: nameOptions,
        },
        lastName: { value: "", label: "Last Name", required: true },
        titleId: { value: 1, label: "Title", required: true },
        email: { value: "", label: "Email", required: true },
        password: { value: "", label: "Password", required: true },
        dateOfBirth: {
          value: "",
          label: "Date of birth",
          type: "date",
          required: true,
        },
        phone: { value: "", label: "Phone" },
        address: { value: "qwe", label: "Address" },
        airportId: {
          value: 2,
          label: "Airport",
          // options: () => grpc.AirlineService.getAll({}),
          required: true,
        },
      },
      User
    );

    return {
      form,
      call: async () => {
        const password = await createHash(form.data.password);
        return grpc.UserService.add({ user: { ...form.data, password } });
      },
    };
  },
});
