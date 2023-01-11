<script lang="ts">
import { modalProps } from "./modal.types";
export default { inheritAttrs: false };

const focusableElements = [
  "a",
  `button:not(.${css.prefix}modal-close-button)`,
  "input",
  "textarea",
  "select",
  "summary",
].join(", ");
</script>

<script setup lang="ts">
import BaseIconClose from "@/components/icons/BaseIconClose.vue";
import { css, isColorName } from "@/utils/css";
import { onClickOutside } from "@vueuse/core";
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap";
import { nextTick, onMounted, onUnmounted, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { ModalInternals } from "./modalController";
import type { Modal } from "./modal.types";

const router = useRouter();
const props = defineProps(modalProps);

const emit = defineEmits(["close", "open"]);

if (!props.name && !props.hash && !props.query)
  throw new Error(
    `Modal must have at least one identifier prop: "name", "hash" or "query".`
  );

const modalRef = ref<HTMLElement | null>(null);
const wrapperRef = ref<HTMLElement | null>(null);
const state: Modal.State = reactive({
  isOpen: false,
  isPaused: false,
  isStackable: props.placement !== "contained",
  zIndex: css.zIndex.modal,
});

const useClose = {
  onClickOutside:
    !props.disableClose &&
    !props.disableCloseOnClickOutside &&
    state.isStackable,
  onButton: !props.disableClose && !props.disableCloseOnButton,
  onEsc: !props.disableClose && !props.disableCloseOnEsc,
};

const focusTrap = useFocusTrap(wrapperRef, {
  initialFocus: getFocusElement,
  allowOutsideClick: true,
});

function getFocusElement() {
  const element =
    modalRef.value?.querySelector("[autofocus]") ||
    modalRef.value?.querySelector(focusableElements) ||
    wrapperRef.value;
  return element as unknown as HTMLElement;
}
function initColor() {
  if (!modalRef.value) return;
  const color = [...modalRef.value.classList].find(isColorName);
  if (color) wrapperRef.value?.classList.add(color);
}

if (useClose.onClickOutside)
  onClickOutside(modalRef, (e: any) => {
    const className = e.target?.className;
    const clickOutside = className.includes(`${css.prefix}modal-wrapper`);
    if (clickOutside) close(false);
  });

function open() {
  const isOpened = ModalInternals.open({ state, props, open, close });
  if (!isOpened) return;
  nextTick(() => {
    initColor();
    if (state.isStackable) focusTrap.activate();
    else getFocusElement()?.focus();
    emit("open");
  });
}
function close(force = true) {
  const wasClosed = ModalInternals.close({ state, props, open, close }, force);
  if (!wasClosed) return;
  if (props.hash || props.query) {
    const route = { ...router.currentRoute.value };
    if (props.hash) route.hash = props.hash === route.hash ? "" : route.hash;
    if (props.query)
      route.query = Object.fromEntries(
        Object.entries(route.query).filter(([key]) => key !== props.query)
      );
    router.replace(route);
  }
  if (state.isStackable) focusTrap.deactivate();
  emit("close");
}

if (state.isStackable)
  watch(
    () => state.isPaused,
    (isPaused) => (isPaused ? focusTrap.pause() : focusTrap.unpause())
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
      Object.keys(query).includes(props.query as string)
        ? open()
        : close(false),
    { immediate: true }
  );
}
if (props.name) {
  onMounted(() => ModalInternals.mount({ state, props, open, close }));
  onUnmounted(() => ModalInternals.unmount({ state, props, open, close }));
}
</script>

<template>
  <Teleport to="body" :disabled="props.placement === 'contained'">
    <Transition :name="`${$prefix}modal-transition`">
      <div
        :class="`${$prefix}modal-wrapper`"
        ref="wrapperRef"
        :data-fullscreen="props.placement === 'fullscreen'"
        :data-contained="props.placement === 'contained'"
        :data-paused="state.isPaused"
        :style="{ zIndex: state.zIndex }"
        tabindex="-1"
        @keydown.esc="() => useClose.onEsc && close(false)"
        v-if="state.isOpen || props.keepAlive"
        v-show="state.isOpen || !props.keepAlive"
        :aria-hidden="!state.isOpen"
        role="dialog"
      >
        <div
          :class="`${$prefix}modal`"
          v-bind="$attrs"
          :data-fullscreen="props.placement === 'fullscreen'"
          ref="modalRef"
        >
          <button
            v-if="useClose.onButton"
            @click="close(false)"
            :class="`${$prefix}modal-close-button ${$prefix}button error text`"
            :style="{ '--base-color': `var(--${$prefix}color-grey-dark)` }"
            aria-label="close"
          >
            <BaseIconClose style="width: inherit; height: inherit" />
          </button>
          <slot></slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
@import "./modals.scss";
</style>
