import { reactive } from "vue";

/**
 * @typedef {{ id: number, message: string, type: ToastType }} ToastItem
 * @typedef { 'success' | 'danger' | 'info' | 'warning' | 'notification' } ToastType
 * @typedef { 'top left' | 'top center' | 'top right' | 'bottom left' | 'bottom center' | 'bottom right' } ToastPosition
 * @typedef {{ position?: ToastPosition, duration?: number, closable?: boolean }} ToastOptions
 * @typedef { (message: string, options?: ToastOptions) => void } CreateToastFunction
 * @typedef { Record<ToastType, CreateToastFunction> } ToastController
 */

/** @type { Record<ToastType, ToastOptions> } */
const settings = {
  success: { position: "top right", duration: 5 * 1000, closable: true },
  danger: { position: "top right", duration: 10 * 1000, closable: true },
  notification: {
    position: "bottom right",
    duration: 20 * 1000,
    closable: true,
  },
  warning: { position: "bottom right", duration: 20 * 1000, closable: true },
  info: { position: "bottom right", duration: 20 * 1000, closable: true },
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
  types: ["success", "danger", "info", "warning", "notification"],
};

/** @type { (type: ToastType) => CreateToastFunction } */
const createToast = (type) => (message, options) => {
  const id = Date.now();
  const cfg = settings[type];
  const position = options?.position ?? cfg.position;
  const duration = options?.duration ?? cfg.duration;
  const closable =
    options?.closable !== undefined ? !!options.closable : !!cfg.closable;

  const list = _toastCtl.data[position];
  list.push({ id, message, type, closable });
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
