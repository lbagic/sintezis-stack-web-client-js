// import { AirlinesResponse } from "@/gen/proto/location/location_response_pb";
// import { Airline } from "@/gen/proto/models/airline_pb";
// import { grpc } from "@/services/api/grpc";
// import { createResource } from "./base/resourceFactory";

// export const airlineResource = createResource({
//   entity: Airline,
//   service: grpc.AirlineService,
//   GetAllResponse: AirlinesResponse,
//   mapDisplayFields: (obj = {}) => ({
//     id: obj.id,
//     Name: obj.name,
//   }),
//   pickGetAllData: ({ airlines }) => airlines,
//   usePagination: false,
// });
