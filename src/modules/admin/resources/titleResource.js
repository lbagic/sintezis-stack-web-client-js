// @ts-check

import { Title } from "@/gen/proto/models/title_pb";
import { grpc, GrpcServices } from "@/services/api/grpc";
import { createResource } from "./base/resourceFactory";

export const titleResource = createResource({
  Entity: Title,
  rpc: GrpcServices.TitleService.methods,
  usePagination: false,
  useDetails: true,
  // tableColumns: [
  //   { label: "First Name", field: "firstName" },
  //   { label: "Last Name", field: "lastName" },
  // ],
  setupGetAllContext() {
    return { call: grpc.TitleService.getAll };
  },
});
