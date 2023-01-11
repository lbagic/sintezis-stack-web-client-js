import { reactive } from "vue";

export function usePromise<T extends () => Promise<any>>(call: T) {
  const state = reactive({
    data: undefined,
    error: undefined,
    isPending: false,
    isSettled: false,
    isFulfilled: false,
    isRejected: false,
  }) as unknown as {
    data: Awaited<ReturnType<T>>;
    error: any;
    isFulfilled: boolean;
    isPending: boolean;
    isRejected: boolean;
    isSettled: boolean;
    execute: T;
  };

  function onSettled(res: any) {
    state.data = res.data;
    state.error = res.error;
    state.isPending = false;
    state.isSettled = true;
    state.isFulfilled = !res.error;
    state.isRejected = !!res.error;
  }

  async function onExecute(...args: any) {
    state.isPending = true;
    state.isSettled = false;
    try {
      const data = await call.apply(null, args);
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
