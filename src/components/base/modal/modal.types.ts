import type { ExtractPropTypes, PropType } from "vue";

export const modalProps = {
  name: String,
  hash: String,
  query: String,
  placement: String as PropType<"contained" | "fullscreen">,
  keepAlive: Boolean,
  disableCloseOnClickOutside: Boolean,
  disableCloseOnButton: Boolean,
  disableCloseOnEsc: Boolean,
  disableClose: Boolean,
};

export namespace Modal {
  export type Props = ExtractPropTypes<typeof modalProps>;
  export type State = {
    isOpen: boolean;
    isPaused: boolean;
    isStackable: boolean;
    zIndex: number;
  };
  export type Instance = {
    props: Modal.Props;
    state: Modal.State;
    open: Function;
    close: Function;
  };
}
