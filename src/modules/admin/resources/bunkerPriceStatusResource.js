// @ts-check

import { BunkerPriceStatusService } from "@/gen/bunkerpricestatus_connectweb";
import { BunkerPriceStatus } from "@/gen/bunkerpricestatus_pb";
import { grpc } from "@/services/api/grpc";
import { createResource } from "./base/resourceFactory";

export const bunkerPriceStatusResource = createResource({
  Entity: BunkerPriceStatus,
  rpc: BunkerPriceStatusService.methods,
  usePagination: false,
  useDetails: true,
  // tableColumns: [
  //   { label: "First Name", field: "firstName" },
  //   { label: "Last Name", field: "lastName" },
  // ],
  setupGetAllContext() {
    return { call: grpc.BunkerPriceStatusService.getAll };
  },
});
