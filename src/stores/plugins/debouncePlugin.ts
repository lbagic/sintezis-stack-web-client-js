import "pinia";
import debounce from "lodash.debounce";
import type { PiniaPlugin } from "pinia";

declare module "pinia" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export interface DefineStoreOptionsBase<S, Store> {
    debounce?: Partial<Record<keyof StoreActions<Store>, number>>;
  }
}

export const debouncePlugin: PiniaPlugin = ({ options, store }) => {
  if (options.debounce)
    return Object.keys(options.debounce).reduce((debouncedActions, action) => {
      if (options.debounce)
        debouncedActions[action] = debounce(
          store[action],
          options.debounce[action]
        );
      return debouncedActions;
    }, {} as { [key: string]: unknown });
};
