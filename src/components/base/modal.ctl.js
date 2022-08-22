import { reactive, watch } from "vue";

/**
 * @typedef {{
 *  isOpen: boolean
 *  open: () => void
 *  close: () => void
 *  local: boolean
 *  expand: boolean
 *  keepAlive: boolean
 * }} ModalState
 * */

/** @type { Record<string, ModalState> } Object for programmatic control of modals. */
export const modal = reactive({});
/**
 * Create modal state.
 *
 * @param { ModalState } state Decsripton.
 * @returns { type } Return description.
 */
function createState(state) {
  return reactive(state);
}

// watcher for toggling body scroll
watch(
  () => modal,
  (modal) => {
    const isFullscreenOpen = Object.values(modal).some(
      (modal) => modal.isOpen && !modal.local
    );
    document.body.style.overflowY = isFullscreenOpen ? "hidden" : "auto";
  },
  { deep: true }
);

let modalId = 1;
export const _modalCtl = reactive({
  modal,
  createState,
  mount(id, state) {
    modal[id ?? modalId++] = state;
  },
  unmount(id) {
    delete modal[id];
  },
});
