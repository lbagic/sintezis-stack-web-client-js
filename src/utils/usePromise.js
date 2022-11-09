import { reactive } from "vue";

/**
 * @type { <T extends PromiseLike<any>>(promise: T) => T & {
 *  error: any
 *  data: Awaited<T>
 *  isPending: boolean
 *  isSettled: boolean
 * }}
 * */
export function usePromise(promise) {
  const state = reactive({
    error: undefined,
    data: undefined,
    isPending: false,
    isSettled: false,
  });
  function defineProp(prop) {
    Object.defineProperty(promise, prop, {
      get() {
        return state[prop];
      },
      set(value) {
        state[prop] = value;
      },
    });
  }
  Object.keys(state).forEach(defineProp);
  promise
    .then((res) => (state.data = res))
    .catch((err) => (state.error = err))
    .finally(() => {
      state.isPending = false;
      state.isSettled = true;
    });
  return promise;
}
