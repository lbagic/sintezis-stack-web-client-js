import axios from "axios";

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

  instance.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) config.headers = { Authorization: `Bearer ${token}` };
      return config;
    },
    (error) => Promise.reject(error)
  );

  return instance;
};
