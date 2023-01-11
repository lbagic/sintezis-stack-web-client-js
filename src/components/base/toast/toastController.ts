import { reactive } from "vue";
import type { Toast } from "./toast.types";

const toastTypes: Toast.TypesArray = [
  "success",
  "error",
  "info",
  "warning",
  "notification",
];

const settings: Record<Toast.Types, Required<Toast.Options>> = {
  success: { position: "top right", duration: 5 * 1000, closable: false },
  error: { position: "top right", duration: 5 * 1000, closable: false },
  warning: { position: "top right", duration: 20 * 1000, closable: true },
  info: { position: "bottom right", duration: 20 * 1000, closable: true },
  notification: {
    position: "bottom right",
    duration: 20 * 1000,
    closable: true,
  },
};

const toasts: Record<Toast.Positions, Toast.Instance[]> = reactive({
  "top left": [],
  "top center": [],
  "top right": [],
  "bottom left": [],
  "bottom center": [],
  "bottom right": [],
});

export const toastInternals = {
  settings,
  data: toasts,
  types: toastTypes,
};

let _id = 1;

const createToast =
  (type: Toast.Types): Toast.Factory =>
  (message, options) => {
    const id = _id++;
    const cfg = settings[type];
    const position = options?.position ?? cfg.position;
    const duration = options?.duration ?? cfg.duration;
    const closable =
      options?.closable !== undefined ? !!options.closable : !!cfg.closable;

    const list = toastInternals.data[position];
    list.push({ id, message, type, closable });
    if (duration)
      setTimeout(() => {
        const index = list.findIndex((toastItem) => toastItem.id === id);
        if (index > -1) list.splice(index, 1);
      }, duration);
  };

export const toastController = toastTypes.reduce((a, c) => {
  const toastFunction = createToast(c);
  a[c] = toastFunction;
  return a;
}, {} as Toast.Controller);
