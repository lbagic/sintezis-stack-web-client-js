<script>
export default { inheritAttrs: false };

const prefix = useCssVar("--prefix").value;
const focusableElements = [
  "a",
  `button:not(.${prefix}modal-close-button)`,
  "input",
  "textarea",
  "select",
  "summary",
].join(", ");
</script>

<script setup>
import BaseIconClose from "@/components/icons/BaseIconClose.vue";
import { onClickOutside, useCssVar } from "@vueuse/core";
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap";
import {
  getCurrentInstance,
  nextTick,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  watch,
} from "vue";
import { useRouter } from "vue-router";
import { css } from "../../../utils/css.js";
import { _modalCtl } from "./modal.ctl.js";

const router = useRouter();
const emit = defineEmits(["close", "open"]);
const props = defineProps({
  name: String,
  hash: String,
  query: String,
  local: Boolean,
  expand: Boolean,
  keepAlive: Boolean,
  disableCloseOnClickOutside: Boolean,
  disableCloseOnButton: Boolean,
  disableCloseOnEsc: Boolean,
  disableClose: Boolean,
});

if (!props.name && !props.hash && !props.query) {
  const instance = getCurrentInstance();
  throw new Error(
    `${instance.type.__name} in "${instance.parent.type.__name}" must have at least one identifier prop: "name", "hash" or "query".`
  );
}

const colorNames = Object.keys(css.colors);
const baseZIndex = Number(useCssVar(`--${prefix}z-index-modal`).value);

const modalRef = ref(null);
const wrapperRef = ref(null);

const state = reactive({
  isOpen: false,
  isPaused: false,
  zIndex: baseZIndex,
});

const util = {
  filterColorName: (name) => colorNames.includes(name),
  getFocusElement: () =>
    modalRef.value.querySelector("[autofocus]") ||
    modalRef.value.querySelector(focusableElements) ||
    wrapperRef.value,
};

const useClose = {
  onClickOutside: !(
    props.disableClose ||
    props.disableCloseOnClickOutside ||
    props.local
  ),
  onButton: !(props.disableClose || props.disableCloseOnButton),
  onEsc: !(props.disableClose || props.disableCloseOnEsc),
};

const focusTrap = props.local
  ? { activate: () => util.getFocusElement()?.focus?.(), deactivate: () => {} }
  : useFocusTrap(wrapperRef, {
      initialFocus: util.getFocusElement,
      allowOutsideClick: true,
    });

function initColor() {
  if (!modalRef.value) return;
  const color = [...modalRef.value.classList].find(util.filterColorName);
  if (color) wrapperRef.value.classList.add(color);
}

if (useClose.onClickOutside)
  onClickOutside(modalRef, (e) => {
    const className = e.target.className;
    const clickOutside = className.includes(`${prefix}modal-wrapper`);
    if (clickOutside) close(false);
  });

function open() {
  const isOpened = _modalCtl.open({ state, props, baseZIndex });
  if (!isOpened) return;
  nextTick(() => {
    initColor();
    focusTrap.activate();
  });
  emit("open");
}
function close(forceClose = true) {
  const isClosed = _modalCtl.close({ state, props, forceClose });
  if (!isClosed) return;
  if (props.hash || props.query) {
    const route = { ...router.currentRoute.value };
    if (props.hash) route.hash = props.hash === route.hash ? "" : route.hash;
    if (props.query)
      route.query = Object.fromEntries(
        Object.entries(route.query).filter(([key]) => key !== props.query)
      );
    router.replace(route);
  }
  focusTrap.deactivate();
  emit("close");
}

watch(
  () => state.isPaused,
  (isPaused) => {
    if (isPaused) focusTrap.pause();
    else focusTrap.unpause();
  }
);

if (props.hash) {
  watch(
    () => router.currentRoute.value.hash,
    (hash) => (hash === props.hash ? open() : close(false)),
    { immediate: true }
  );
}
if (props.query) {
  watch(
    () => router.currentRoute.value.query,
    (query) =>
      Object.keys(query).includes(props.query) ? open() : close(false),
    { immediate: true }
  );
}
if (props.name) {
  onMounted(() => _modalCtl.mount({ state, props, open, close }));
  onUnmounted(() => _modalCtl.unmount({ props }));
}
</script>

<template>
  <Teleport to="body" :disabled="props.local">
    <Transition :name="`${prefix}modal-transition`">
      <dialog
        :class="`${prefix}modal-wrapper`"
        ref="wrapperRef"
        :data-expand="props.expand"
        :data-local="props.local"
        :data-paused="state.isPaused"
        tabindex="-1"
        :style="{ zIndex: state.zIndex }"
        @keydown.esc="() => useClose.onEsc && close(false)"
        v-if="state.isOpen || props.keepAlive"
        v-show="state.isOpen || !props.keepAlive"
        :aria-hidden="!state.isOpen"
        role="dialog"
      >
        <div
          :class="`${prefix}modal`"
          v-bind="$attrs"
          :data-expand="props.expand"
          ref="modalRef"
        >
          <button
            v-if="useClose.onButton"
            @click="close(false)"
            :class="`${prefix}modal-close-button ${$prefix}button danger text`"
            :style="{ '--base-color': `var(--${prefix}color-grey-dark)` }"
            aria-label="close"
          >
            <BaseIconClose style="width: inherit; height: inherit" />
          </button>
          <slot></slot>
        </div>
      </dialog>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss"></style>
