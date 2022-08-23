import { Api } from "../../services/calls/Api";

export const itemService = {
  index: () => Api.snt.get("/api/items"),
  get: ({ id }) => Api.snt.get(`/api/items/${id}`),
};
