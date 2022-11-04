import fetchAdapter from "@vespaiach/axios-fetch-adapter";
import axios from "axios";
import { restInterceptors } from "../api-interceptors/interceptors";

/** @type { (options: import("axios").AxiosRequestConfig<any>) => import("axios").AxiosInstance } */
function createRestInstance(options) {
  const instance = axios.create(options);
  restInterceptors.forEach(({ request, response }) => {
    if (request) instance.interceptors.request.use(...request);
    if (response) instance.interceptors.response.use(...response);
  });
  return instance;
}

export const rest = {
  snt: createRestInstance({
    baseURL: "",
    adapter: fetchAdapter,
  }),
};

// rest.snt.get('https://fakerapi.it/api/v1/books?_quantity=1')
// rest.snt.get('https://api.aftership.com/v4/trackings')
