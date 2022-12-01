// @ts-check

import { BunkerPriceService } from "@/gen/bunkerprice_connectweb";
import { BunkerPrice } from "@/gen/bunkerprice_pb";
import { grpc } from "@/services/api/grpc";
import { createResource } from "./base/resourceFactory";

export const bunkerPriceResource = createResource({
  Entity: BunkerPrice,
  rpc: BunkerPriceService.methods,
  usePagination: false,
  useDetails: true,
  // tableColumns: [
  //   { label: "First Name", field: "firstName" },
  //   { label: "Last Name", field: "lastName" },
  // ],
  setupGetAllContext() {
    return { call: grpc.BunkerPriceService.getAll };
  },
});
