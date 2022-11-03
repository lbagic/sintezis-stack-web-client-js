import axios from "axios";
import { interceptors } from "./interceptors";

/** @type { (options: import("axios").AxiosRequestConfig<any>) => import("axios").AxiosInstance } */
function createRestInstance(options) {
  const instance = axios.create(options);
  interceptors.forEach(({ rest }) => {
    if (rest.request) instance.interceptors.request.use(...rest.request);
    if (rest.response) instance.interceptors.response.use(...rest.response);
  });
  return instance;
}

export const rest = {
  snt: createRestInstance({ baseURL: "" }),
};
