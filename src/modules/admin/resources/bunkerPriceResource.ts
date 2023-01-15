// TODO extract all forms to components
import { useFormConfig } from "@/components/base/input-old/input.ctl";
import { BunkerPriceService } from "@/gen/bunkerprice_connectweb";
import { BunkerPrice } from "@/gen/bunkerprice_pb";
import { grpc } from "@/services/api/grpc";
import { ref } from "vue";
import { createResource } from "./base/resourceFactory";

export const bunkerPriceResource = createResource({
  Entity: BunkerPrice,
  rpc: BunkerPriceService.methods,
  usePagination: true,
  useDetails: true,
  setupGetAllContext() {
    return { call: grpc.BunkerPriceService.getAll };
  },
  setupAddContext() {
    const bunkerPriceStatusOptions = ref<Record<string, unknown>>({});
    grpc.BunkerPriceStatusService.getAll({}).then((res) => {
      res.bunkerPriceStatuses.forEach(
        (el) => (bunkerPriceStatusOptions.value[el.priceStatus] = el.ID)
      );
    });
    const form = useFormConfig(
      {
        ID: {
          value: 0,
          label: "ID",
          required: true,
        },
        bunkerPriceStatusID: {
          value: undefined,
          label: "Bunker Price Status",
          options: bunkerPriceStatusOptions,
        },
      },
      BunkerPrice
    );
    return {
      call: () => grpc.BunkerPriceService.add(form.data),
      form,
    };
  },
  setupEditContext(data) {
    const bunkerPriceStatusOptions = ref<Record<string, any>>({});
    grpc.BunkerPriceStatusService.getAll({}).then((res) => {
      res.bunkerPriceStatuses.forEach(
        (el) => (bunkerPriceStatusOptions.value[el.priceStatus] = el.ID)
      );
    });
    const form = useFormConfig(
      {
        ID: { value: data.ID, label: "ID", readonly: true },
        bunkerPriceStatusID: {
          value: data.bunkerPriceStatusID,
          label: "Bunker Price Status",
          options: bunkerPriceStatusOptions,
        },
      },
      BunkerPrice
    );
    return {
      form,
      call: () => grpc.BunkerPriceService.edit(form.data),
    };
  },
  setupDeleteContext(data) {
    return { call: () => grpc.BunkerPriceService.delete(data) };
  },
});
