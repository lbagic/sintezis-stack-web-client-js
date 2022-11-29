// @ts-check

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
});
