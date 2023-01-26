import { css } from "@/utils/css";
import { modalProps } from "naive-ui";
import type { PropType } from "vue";

type ModalInstance = {
  show: () => void;
  hide: () => void;
};

export const baseModalProps = {
  ...modalProps,
  name: String,
  hash: String,
  query: String,
  routerAction: {
    type: String as PropType<"push" | "replace">,
    default: "replace",
  },
  maskColor: {
    type: String,
    default: css.colors.primary["opaque-soft"],
  },
};

export const modalController: Record<string, ModalInstance> = {};

export const modalInternals = {
  register(name: string, modal: ModalInstance) {
    modalController[name] = modal;
  },
  destroy(name: string) {
    delete modalController[name];
  },
};
