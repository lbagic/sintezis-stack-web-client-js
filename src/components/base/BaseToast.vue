<script>
/**
 * @typedef {{ id: number, message: string, type: ToastType }} ToastItem
 * @typedef { 'success' | 'error' | 'info' } ToastType
 * @typedef { 'top left' | 'top center' | 'top right' | 'bottom left' | 'bottom center' | 'bottom right' } ToastPosition
 * @typedef {{ position: ToastPosition, duration: number }} ToastOptions
 * @typedef { (message: string, options?: ToastOptions) => () void } CreateToastFunction
 */

/** @type { Record<ToastType, ToastOptions> } */
const settings = {
  success: { position: "top center", duration: 3000 },
  error: { position: "bottom center", duration: 3000 },
  info: { position: "bottom right", duration: 30 * 1000 },
};

/** @type { Record<ToastPosition, ToastItem[]> } */
const _data = reactive({
  "top left": [],
  "top center": [],
  "top right": [],
  "bottom left": [],
  "bottom center": [],
  "bottom right": [],
});

/** @type { ToastType[] } */
const toastTypes = ["success", "error", "info"];

/** @type { Record<ToastType, CreateToastFunction> } */
export const toast = Object.fromEntries(
  toastTypes.map((type) => [
    type,
    (message, options = {}) => {
      const id = Date.now();
      const cfg = settings[type];
      const position = options?.position ?? cfg.position;
      const duration = options?.duration ?? cfg.duration;

      const list = _data[position];
      list.push({ id, message, type });
      if (duration)
        setTimeout(() => {
          const index = list.findIndex((toast) => toast.id === id);
          if (index > -1) list.splice(index, 1);
        }, duration);
    },
  ])
);
</script>

<script setup>
import { reactive } from "vue";

const data = _data;
</script>

<template>
  <TransitionGroup
    v-for="(toasts, position) in data"
    :name="
      position.includes('top')
        ? 'snt-toast-transition-top'
        : 'snt-toast-transition-bottom'
    "
    tag="div"
    class="snt-toast-wrapper"
    :key="position"
    :data-position="position"
  >
    <div
      v-for="toast in toasts"
      class="snt-toast"
      :key="toast.id"
      :data-type="toast.type"
    >
      {{ toast.message }}
    </div>
  </TransitionGroup>
  <pre>{{ data }}</pre>
</template>

<style scoped lang="scss"></style>
