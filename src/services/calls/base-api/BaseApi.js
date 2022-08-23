import axios from "axios";
import { authInterceptor } from "../interceptors/authInterceptor";
import { logInterceptor } from "../interceptors/logInterceptor";

/**
 * Creates an api instance.
 *
 * @param {{
 *  baseURL: String,
 *  getToken: () => String,
 * }} config Decsripton.
 */
export const createApi = (config) => {
  const { getToken, baseURL } = config;
  if (!baseURL) throw new Error("Api baseURL is missing.");
  const instance = axios.create({ baseURL });

  authInterceptor.api(instance, { getToken });
  logInterceptor.api(instance);

  return instance;
};
