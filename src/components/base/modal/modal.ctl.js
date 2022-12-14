import { reactive, watch } from "vue";

/**
 * @typedef { Readonly<{
 *  name?: string,
 *  hash?: string,
 *  query?: string,
 *  local: boolean,
 *  expand: boolean,
 *  keepAlive: boolean,
 *  disableCloseOnClickOutside: boolean,
 *  disableCloseOnButton: boolean,
 *  disableCloseOnEsc: boolean,
 *  disableClose: boolean,
 * }> } ModalProps
 * @typedef {{
 *  isOpen: boolean,
 *  isPaused: boolean,
 *  zIndex: number,
 * }} ModalState
 * @typedef {{
 *  state: ModalState
 *  props: ModalProps
 *  open: () => void
 *  close: () => void
 * }} ModalCtl
 */

/**
 * @type {{
 *  modals: Record<string, ModalCtl>
 *  openNonLocalModals: { state: ModalState, props: ModalProps }[]
 * }}
 */
const ctl = reactive({
  modals: {},
  openNonLocalModals: [],
});

/**
 * @type {{
 *  mount: (config: ModalCtl) => void
 *  unmount: (config: { props: ModalProps }) => void
 *  open: (config: { state: ModalState, props: ModalProps, baseZIndex: number }) => void
 *  close: (config: { state: ModalState, props: ModalProps, forceClose: boolean }) => void
 * }}
 */
export const _modalCtl = {
  mount({ state, props, open, close }) {
    const name = props.name;
    if (ctl.modals[name])
      throw new Error(`Modal with name "${name}" already exists.`);
    ctl.modals[name] = { state, props, open, close };
  },
  unmount({ props }) {
    const name = props.name;
    delete ctl.modals[name];
  },
  open({ state, props, baseZIndex }) {
    if (state.isOpen) return;
    if (!props.local) {
      ctl.openNonLocalModals.push({ state, props });
      state.zIndex = baseZIndex + ctl.openNonLocalModals.length;
    }
    state.isOpen = true;
    return true;
  },
  close({ state, props, forceClose }) {
    if (!state.isOpen || (state.isPaused && !forceClose)) return;
    if (!props.local) {
      ctl.openNonLocalModals.pop();
    }
    state.isOpen = false;
    return true;
  },
};

watch(
  () => ctl.openNonLocalModals.length,
  (stackLength) => {
    // toggle focus pause for non local modals
    if (stackLength) {
      const items = ctl.openNonLocalModals.slice(0, -1);
      const lastItem = ctl.openNonLocalModals.at(-1);
      items.forEach((modal) => (modal.state.isPaused = true));
      setTimeout(() => (lastItem.state.isPaused = false));
    }
    // toggle body scroll
    document.body.style.overflowY = stackLength ? "hidden" : "auto";
  }
);

export const modal = ctl.modals;
