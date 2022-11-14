import { reactive } from "vue";

/**
 * @type { <T>(call: T) => {
 *  data: Awaited<ReturnType<T>>
 *  error: any
 *  isFulfilled: boolean
 *  isPending: boolean
 *  isRejected: boolean
 *  isSettled: boolean
 *  execute: T
 * }}
 */
export function usePromise(call) {
  const state = reactive({
    data: undefined,
    error: undefined,
    isPending: false,
    isSettled: false,
    isFulfilled: false,
    isRejected: false,
  });

  function onSettled({ data, error }) {
    state.data = data;
    state.error = error;
    state.isPending = false;
    state.isSettled = true;
    state.isFulfilled = !error;
    state.isRejected = !!error;
  }

  async function onExecute(...args) {
    state.isPending = true;
    state.isSettled = false;
    try {
      const data = await call(...args);
      onSettled({ data });
      return data;
    } catch (error) {
      onSettled({ error });
      throw error;
    }
  }

  Object.assign(state, { execute: onExecute });
  return state;
}
