import { reactive } from "vue";

export function usePromise<T extends (...args: any[]) => Promise<any>>(
  call: T,
  hooks?: {
    onError?: (error: any) => any;
    onSuccess?: (res: Awaited<ReturnType<T>>) => any;
  }
) {
  const ctx = {
    data: undefined as undefined | Awaited<ReturnType<T>>,
    error: undefined as undefined | any,
    isPending: false,
    isSettled: false,
    isFulfilled: false,
    isRejected: false,
    execute: undefined as unknown as T,
  };
  const state = reactive(ctx) as typeof ctx;

  function handle(
    type: "start" | "success" | "error",
    payload: any = undefined
  ) {
    state.isPending = type === "start";
    state.isSettled = !state.isPending;
    state.isFulfilled = type === "success";
    state.isRejected = type === "error";
    state.data = type === "success" ? payload : undefined;
    state.error = type === "error" ? payload : undefined;
    if (type === "success") hooks?.onSuccess?.(payload);
    if (type === "error") hooks?.onError?.(payload);
  }

  state.execute = (async (...args) => {
    handle("start");
    try {
      const data = await call(...args);
      handle("success", data);
      return data;
    } catch (error) {
      handle("error", error);
      throw error;
    }
  }) as T;

  return state;
}
