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
export const modals = reactive({});
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
  () => modals,
  (modals) => {
    const isFullscreenOpen = Object.values(modals).some(
      (modal) => modal.isOpen && !modal.local
    );
    document.body.style.overflowY = isFullscreenOpen ? "hidden" : "auto";
  },
  { deep: true }
);

let modalId = 1;
export const _modalCtl = reactive({
  modals,
  createState,
  mount(id, state) {
    modals[id ?? modalId++] = state;
  },
  unmount(id) {
    delete modals[id];
  },
});
