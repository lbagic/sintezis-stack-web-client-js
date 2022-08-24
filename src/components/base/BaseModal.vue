<script>
export default {
  inheritAttrs: false,
};
</script>

<script setup>
import { onClickOutside, useCssVar } from "@vueuse/core";
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap";
import { nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { css } from "../../utils/css.js";
import { _modalCtl } from "./modal.ctl.js";
const voidFn = () => undefined;

const emit = defineEmits(["close", "open"]);
const props = defineProps({
  name: { type: String, required: true },
  local: Boolean,
  expand: Boolean,
  keepAlive: Boolean,
  disableCloseOnClickOutside: Boolean,
  disableCloseOnButton: Boolean,
  disableCloseOnEsc: Boolean,
  disableClose: Boolean,
});

const prefix = useCssVar("--prefix");
const baseZIndex = Number(
  useCssVar(`--${prefix.value}app-modal-z-index`).value
);
let zIndex = $ref(Number(baseZIndex.value));
const modalRef = ref();
const wrapperRef = ref();
const colorNames = Object.keys(css.colors);
const colorFilter = (name) => colorNames.includes(name);
const focusTrap = props.local
  ? { activate: voidFn, deactivate: voidFn }
  : useFocusTrap(wrapperRef, { initialFocus: false });
const setInitialFocus = () => {
  const focusElement =
    modalRef.value.querySelector("[autofocus]") ||
    modalRef.value.querySelector(
      `a, button:not(.${prefix.value}modal-close-button), input, textarea, select, summary`
    ) ||
    wrapperRef.value;
  focusElement?.focus?.();
};

const disabledClose = {
  onClickOutside:
    props.disableClose || props.disableCloseOnClickOutside || props.local,
  onButton: props.disableClose || props.disableCloseOnButton,
  onEsc: props.disableClose || props.disableCloseOnEsc,
};

function open() {
  if (state.isOpen) return;
  zIndex = _modalCtl.stack.length + baseZIndex;
  console.log(zIndex);
  if (!props.local) _modalCtl.stack.push(state);
  state.isOpen = true;
  emit("open");
}
function close(forceClose = true) {
  if (!state.isOpen) return;
  if (state.paused && !forceClose) return;
  if (!props.local) _modalCtl.stack.pop();
  state.isOpen = false;
  emit("close");
}

const state = _modalCtl.createState({
  isOpen: false,
  open,
  close,
  local: props.local,
  expand: props.expand,
  keepAlive: props.keepAlive,
  paused: false,
});

if (!disabledClose.onClickOutside) onClickOutside(modalRef, () => close(false));

async function copyColorClassToWrapper() {
  const colors = [...modalRef.value.classList].filter(colorFilter);
  wrapperRef.value.classList.add(...colors);
}
watch(
  () => state.isOpen,
  async (isOpen) => {
    if (isOpen) {
      await nextTick();
      copyColorClassToWrapper();
      focusTrap.activate();
      setInitialFocus();
    } else {
      focusTrap.deactivate();
    }
  }
);
watch(
  () => state.paused,
  (isPaused) => {
    if (isPaused) focusTrap.pause();
    else focusTrap.unpause();
  }
);

onMounted(() => {
  _modalCtl.mount(props.name, state);
});
onUnmounted(() => {
  _modalCtl.unmount(props.name);
});
</script>

<template>
  <Teleport to="body" :disabled="props.local">
    <Transition :name="`${prefix}modal-transition`">
      <div
        :class="`${prefix}modal-wrapper`"
        ref="wrapperRef"
        :data-expand="props.expand"
        :data-local="props.local"
        :data-paused="state.paused"
        tabindex="-1"
        :style="{ zIndex }"
        @keydown.esc="() => !disabledClose.onEsc && close(false)"
        v-if="state.isOpen || props.keepAlive"
        v-show="state.isOpen || !props.keepAlive"
      >
        <div
          :class="`${prefix}modal`"
          v-bind="$attrs"
          :data-expand="props.expand"
          ref="modalRef"
        >
          <button
            v-if="!disabledClose.onButton"
            @click="close(false)"
            :class="`${prefix}modal-close-button`"
          ></button>
          <pre>{{ state.paused }}</pre>
          <slot></slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss"></style>
