import { reactive } from "vue";

/**
 * @typedef {{ id: number, message: string, type: ToastType }} ToastItem
 * @typedef { 'success' | 'error' | 'info' } ToastType
 * @typedef { 'top left' | 'top center' | 'top right' | 'bottom left' | 'bottom center' | 'bottom right' } ToastPosition
 * @typedef {{ position: ToastPosition, duration: number }} ToastOptions
 * @typedef { (message: string, options?: ToastOptions) => void } CreateToastFunction
 * @typedef { Record<ToastType, CreateToastFunction> } ToastController
 */

/** @type { Record<ToastType, ToastOptions> } */
const settings = {
  success: { position: "top center", duration: 3000 },
  error: { position: "bottom center", duration: 3000 },
  info: { position: "bottom right", duration: 30 * 1000 },
};

export const _toastCtl = {
  settings,
  /** @type { Record<ToastPosition, ToastItem[]> } */
  data: reactive({
    "top left": [],
    "top center": [],
    "top right": [],
    "bottom left": [],
    "bottom center": [],
    "bottom right": [],
  }),
  /** @type { ToastType[] } */
  types: ["success", "error", "info"],
};

/** @type { (type: ToastType) => CreateToastFunction } */
const createToast = (type) => (message, options) => {
  const id = Date.now();
  const cfg = settings[type];
  const position = options?.position ?? cfg.position;
  const duration = options?.duration ?? cfg.duration;

  const list = _toastCtl.data[position];
  list.push({ id, message, type });
  if (duration)
    setTimeout(() => {
      const index = list.findIndex((toastItem) => toastItem.id === id);
      if (index > -1) list.splice(index, 1);
    }, duration);
};

/** @type { ToastController } */
export const toast = _toastCtl.types.reduce((a, type) => {
  a[type] = createToast(type);
  return a;
}, {});
