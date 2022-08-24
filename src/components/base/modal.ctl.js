import { reactive, watch } from "vue";

/**
 * @typedef {{
 *  isOpen: boolean
 *  open: () => void
 *  close: () => void
 *  local: boolean
 *  expand: boolean
 *  keepAlive: boolean
 *  paused: boolean
 * }} ModalState
 * */

/** @type { Record<string, ModalState> } Object for programmatic control of modals. */
export const modal = reactive({});
const modals = modal;

/**
 * Create modal state.
 *
 * @param { ModalState } state.
 * @returns { ModalState }.
 */
function createState(state) {
  return reactive(state);
}

// watcher for toggling body scroll

let modalId = 1;
export const _modalCtl = reactive({
  modals,
  /** @type { ModalState[] } */
  stack: [],
  createState,
  mount(id, state) {
    const identifier = id ?? modalId++;
    modals[identifier] = state;
  },
  unmount(id) {
    delete modals[id];
  },
});

watch(
  () => _modalCtl.stack.length,
  (stackLength) => {
    if (stackLength) {
      const last = _modalCtl.stack.at(-1);
      _modalCtl.stack.forEach((modal) => (modal.paused = true));
      setTimeout(() => (last.paused = false));
    }
    console.log(_modalCtl.stack.map((el) => el.paused));
    const isFullscreenOpen = _modalCtl.stack.some((modal) => !modal.local);
    document.body.style.overflowY = isFullscreenOpen ? "hidden" : "auto";
  },
  { deep: true }
);
