import { AirlinesResponse } from "@/gen/proto/location/location_response_pb";
import { Airline } from "@/gen/proto/models/airline_pb";
import { grpc } from "@/services/api/grpc";
import { createService } from "./base/serviceFactory";

export const AirlineService = createService({
  entity: Airline,
  service: grpc.AirlineService,
  mapDisplayFields: (obj) => ({
    id: obj.id,
    Name: obj.name,
  }),
  GetAllResponse: AirlinesResponse,
  usePagination: false,
  mapGetAll: ({ airlines, pagination }) => ({ data: airlines, pagination }),
});
