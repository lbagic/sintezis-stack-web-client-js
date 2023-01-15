import { useFormConfig } from "@/components/base/input-old/input.ctl";
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
  //   { label: "Identifier", field: "ID" },
  //   { label: "Price Status Name", field: (o) => o.priceStatus },
  // ],
  setupGetAllContext() {
    return { call: grpc.BunkerPriceStatusService.getAll };
  },
  setupDeleteContext(data) {
    return { call: () => grpc.BunkerPriceStatusService.delete(data) };
  },
  setupEditContext(data) {
    const form = useFormConfig(
      {
        ID: {
          label: "ID",
          readonly: true,
          required: true,
          type: "number",
          value: data.ID,
        },
        priceStatus: {
          label: "Price Status",
          required: true,
          value: data.priceStatus,
        },
      },
      BunkerPriceStatus
    );
    return {
      form,
      call: () => grpc.BunkerPriceStatusService.edit(form.data),
    };
  },
  setupAddContext() {
    const form = useFormConfig(
      {
        ID: {
          value: 0,
          label: "ID",
          type: "number",
          required: true,
        },
        priceStatus: {
          value: "",
          label: "Price Status",
          required: true,
        },
      },
      BunkerPriceStatus
    );
    return {
      form,
      call: () => grpc.BunkerPriceStatusService.add(form.data),
    };
  },
});
