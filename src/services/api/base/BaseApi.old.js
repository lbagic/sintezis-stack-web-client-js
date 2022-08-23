import axios from "axios";
import { injectAspect } from "../../other/utils/aop";
// import { store } from '../../store/store'

const instance = axios.create();

export const Api = {
  _401interceptor: null,

  init(baseUrl) {
    instance.defaults.baseURL = baseUrl;
    this.setHeader();
    // instance.interceptors.response.use(
    //   res => res,
    //   err => {
    //     if (err.response.status === 401) store.dispatch('AuthModule/logout')
    //     throw err
    //   },
    // )
  },

  setHeader: (token) => {
    if (token)
      instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  },
  removeHeader: () => {
    instance.defaults.headers.common = {};
  },

  get: instance.get,
  post: instance.post,
  put: instance.put,
  delete: instance.delete,
};

const promiseHandleAspect = (promise) => {
  return promise
    .then((response) => ({
      code: response.data.code,
      msg: response.data.response.msg,
      payload: response.data.response.payload,
    }))
    .catch((error) => {
      throw {
        code: error.response?.data?.code,
        msg: error.response?.data?.error?.display?.msg || "Api error",
        title: error.response?.data?.error?.display?.title,
        apiErrors: error.response?.data?.error?.api_errors,
        debug: error.response?.data?.error?.debug,
      };
    });
};

// Call deduplication - consolidate multiple identical calls into one call
const promiseMap = new Map();
const promiseExhaustAspect = async (promiseFn, ...args) => {
  const [resource, data] = args;
  const key = resource + (data ? JSON.stringify(data) : "");
  const entry = promiseMap.get(key);
  const createPromise = (exists) => {
    if (exists) clearTimeout(entry[1]);
    const timeout = setTimeout(() => promiseMap.delete(key), 1000 * 15);
    const promise = promiseFn(...args);
    promiseMap.set(key, [promise, timeout]);
    return promise;
  };
  if (!entry) return createPromise();
  let isSettled = false;
  entry[0].finally(() => (isSettled = true));
  await Promise.resolve();
  if (isSettled) return createPromise(true);
  return entry[0];
};

injectAspect(Api, promiseExhaustAspect, "beforeExecuting", ["get", "post"]);
injectAspect(Api, promiseHandleAspect, "afterReturning", [
  "get",
  "post",
  "put",
  "delete",
]);
