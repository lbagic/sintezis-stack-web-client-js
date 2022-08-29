import { Api } from "../../services/calls/Api";

export const testService = {
  index: () => Api.snt.get("/entries"),
};
