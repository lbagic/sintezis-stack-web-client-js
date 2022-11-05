import fetchAdapter from "@vespaiach/axios-fetch-adapter";
import axios from "axios";

/**
 * @typedef { import("axios").AxiosRequestConfig<any> & { interceptors: import("./interceptorFactory").RestInterceptor[] } } RestPromiseClientOptions
 * @typedef { import("axios").AxiosInstance } RestPromiseClient
 * */

/** @type { (options: RestPromiseClientOptions) => RestPromiseClient } */
export function createRestPromiseClient(options) {
  options.adapter = fetchAdapter;
  const instance = axios.create(options);

  const interceptors = options.interceptors ?? [];
  interceptors.forEach(({ request, response }) => {
    if (request) instance.interceptors.request.use(...request);
    if (response) instance.interceptors.response.use(...response);
  });

  return instance;
}
