import { SearchTypeEnum } from "@/gen/proto/commons/enum_pb";
import { grpc } from "@/services/api/grpc";
import { rest } from "@/services/api/rest";
import { useExampleStore } from "./exampleStore";

export const exampleService = {
  // BASIC EXAMPLES
  getBooks: () => rest.snt.get("https://fakerapi.it/api/v1/books?_quantity=1"),
  trackings: () => rest.snt.get("https://api.aftership.com/v4/trackings"),
  login: grpc.snt.login,
  getLocations: grpc.snt.getLocations,

  // EXTENDED EXAMPLES
  customGetBooks: ({ qunatity }) =>
    rest.snt.get(`https://fakerapi.it/api/v1/books?_quantity=${qunatity}`),
  /** @type { typeof grpc.snt.login } */
  customLogin: async () => {
    const response = await grpc.snt.login();
    useExampleStore().token = response.token;
    return response;
  },
  /** @type { typeof grpc.snt.getLocations } */
  customGetLocations: ({ search }) =>
    grpc.snt.getLocations({
      search,
      searchType: SearchTypeEnum.AIRPORT_SEARCH,
    }),
};
