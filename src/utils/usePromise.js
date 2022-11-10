import { reactive } from "vue";

/**
 * @type { <T extends PromiseLike<any>>(promise: T) =>
 * T & {
 *  data: Awaited<T>
 *  error: any
 *  isFulfilled: boolean
 *  isPending: boolean
 *  isRejected: boolean
 *  isSettled: boolean
 * }}
 */
export function usePromise(promise) {
  const state = reactive({
    data: undefined,
    error: undefined,
    isFulfilled: false,
    isPending: true,
    isRejected: false,
    isSettled: false,
  });
  Object.keys(state).forEach((prop) =>
    Object.defineProperty(promise, prop, {
      get() {
        return state[prop];
      },
      set(value) {
        state[prop] = value;
      },
    })
  );

  promise
    .then((res) => {
      state.data = res;
      state.isFulfilled = true;
      state.isPending = false;
      state.isSettled = true;
    })
    .catch((err) => {
      state.error = err;
      state.isRejected = true;
      state.isPending = false;
      state.isSettled = true;
    });
  return promise;
}
