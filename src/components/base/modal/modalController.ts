import { css } from "@/utils/css";
import { reactive, watch } from "vue";
import type { Modal } from "./modal.types";

const ctl: {
  modals: Record<string, Modal.Instance>;
  modalStack: Modal.Instance[];
} = reactive({
  modals: {},
  modalStack: [],
});

export const ModalInternals = {
  mount(modal: Modal.Instance) {
    const name = modal.props.name;
    if (!name) throw new Error(`Can not mount modal without name.`);
    const exists = ctl.modals[name];
    if (exists) throw new Error(`Modal with name "${name}" already exists.`);
    ctl.modals[name] = modal;
  },
  unmount(modal: Modal.Instance) {
    const name = modal.props.name;
    if (!name) throw new Error(`Can not unmount modal without name.`);
    delete ctl.modals[name];
  },
  open(modal: Modal.Instance) {
    const { state } = modal;
    if (state.isOpen) return false;
    if (state.isStackable) {
      ctl.modalStack.push(modal);
      state.zIndex = css.zIndex.modal + ctl.modalStack.length;
    }
    state.isOpen = true;
    return true;
  },
  close(modal: Modal.Instance, force: boolean) {
    const { state } = modal;
    if (!state.isOpen || (state.isPaused && !force)) return false;
    if (state.isStackable) ctl.modalStack.pop();
    state.isOpen = false;
    return true;
  },
};

watch(
  () => ctl.modalStack.length,
  (stackLength) => {
    if (stackLength) {
      const paused = ctl.modalStack.slice(0, -1);
      const active = ctl.modalStack.at(-1);
      paused.forEach((modal) => (modal.state.isPaused = true));
      if (active) setTimeout(() => (active.state.isPaused = false));
    }
    document.body.style.overflowY = stackLength ? "hidden" : "auto";
  }
);

export const modalController = ctl.modals;
