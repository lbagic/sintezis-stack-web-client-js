// @@ts-check

import { useFormConfig } from "@/components/base/input/input.ctl";
import { Airline } from "@/gen/proto/models/airline_pb";
import { grpc, GrpcServices } from "@/services/api/grpc";
import { createResource } from "./base/resourceFactory";

export const airlineResource = createResource({
  entity: Airline,
  rpc: GrpcServices.AirlineService.methods,
  usePagination: false,
  useDetails: true,
  setupGetAllContext() {
    return { call: grpc.AirlineService.getAll };
  },
  setupAddContext() {
    const form = useFormConfig(
      {
        name: {
          value: "",
          required: true,
          label: "Name",
        },
        iataCode: {
          value: "",
          required: true,
          label: "Iata Code",
        },
      },
      Airline
    );
    return {
      form,
      call: () => grpc.AirlineService.add({ airline: form.data }),
    };
  },
  setupEditContext(item) {
    const form = useFormConfig(
      {
        id: {
          value: item.id,
          type: "number",
          label: "Id",
          required: true,
          disabled: true,
        },
        name: {
          value: item.name,
          required: true,
          label: "Name",
        },
        iataCode: {
          value: item.iataCode,
          required: true,
          label: "Iata Code",
        },
      },
      Airline
    );
    return {
      form,
      call: () => grpc.AirlineService.edit({ airline: form.data }),
    };
  },
  setupDeleteContext() {
    return {
      call: (item) => grpc.AirlineService.delete({ id: item.id }),
    };
  },
});
