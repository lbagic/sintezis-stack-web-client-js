import { SearchTypeEnum } from "@/gen/proto/commons/enum_pb";
import { grpc } from "@/services/api/grpc";
import { rest } from "@/services/api/rest";
import { useExampleStore } from "./exampleStore";

export const exampleService = {
  // BASIC EXAMPLES
  getBooks: () => rest.get("https://fakerapi.it/api/v1/books?_quantity=1"),
  trackings: () => rest.get("https://api.aftership.com/v4/trackings"),
  login: grpc.GatewayController.login,
  getLocations: grpc.GatewayController.getLocations,

  // EXTENDED EXAMPLES
  customGetBooks: ({ qunatity }) =>
    rest.get(`https://fakerapi.it/api/v1/books?_quantity=${qunatity}`),
  /** @type { typeof grpc.GatewayController.login } */
  customLogin: async () => {
    const response = await grpc.GatewayController.login();
    useExampleStore().token = response.token;
    return response;
  },
  /** @type { typeof grpc.GatewayController.getLocations } */
  customGetLocations: ({ search }) =>
    grpc.GatewayController.getLocations({
      search,
      searchType: SearchTypeEnum.AIRPORT_SEARCH,
    }),
};
