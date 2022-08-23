import { Api } from "../../services/calls/Api";

export const testService = {
  index: () => Api.snt.get("/api/items"),
  get: ({ id }) => Api.snt.get(`/api/items/${id}`),
};
