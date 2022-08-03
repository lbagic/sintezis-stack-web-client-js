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
  fullscreen: Boolean,
  placeHere: Boolean,
  name: String,
  urlQuery: String,
  urlHash: String,
  disableCloseOnClickOutside: Boolean,
  disableCloseOnButton: Boolean,
  disableCloseOnEsc: Boolean,
  disableClose: Boolean,
});

const prefix = useCssVar("--prefix");
const modalRef = ref();
const wrapperRef = ref();
const colorNames = Object.keys(css.colors);
const colorFilter = (name) => colorNames.includes(name);
const focusTrap = props.placeHere
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
    props.disableClose || props.disableCloseOnEsc || props.placeHere,
  onButton: props.disableClose || props.disableCloseOnButton,
  onEsc: props.disableClose || props.disableCloseOnEsc,
};

function open() {
  if (state.isOpen) return;
  state.isOpen = true;
  emit("open");
}
function close() {
  if (!state.isOpen) return;
  state.isOpen = false;
  emit("close");
}

const state = _modalCtl.createState({
  isOpen: false,
  open,
  close,
  placeHere: props.placeHere,
  fullscreen: props.fullscreen,
});

if (!disabledClose.onClickOutside) onClickOutside(modalRef, close);

async function copyColorClassToWrapper() {
  const colors = [...modalRef.value.classList].filter(colorFilter);
  wrapperRef.value.classList.add(...colors);
}
watch(
  () => state.isOpen,
  async (value) => {
    await nextTick();
    if (value) {
      copyColorClassToWrapper();
      focusTrap.activate();
      setInitialFocus();
    } else {
      focusTrap.deactivate;
    }
  },
  { immediate: true }
);

onMounted(() => {
  _modalCtl.mount(props.name, state);
});
onUnmounted(() => {
  _modalCtl.unmount(props.name);
});
</script>

<template>
  <Teleport to="body" :disabled="props.placeHere">
    <Transition :name="`${prefix}modal-transition`">
      <div
        :class="`${prefix}modal-wrapper`"
        ref="wrapperRef"
        :data-fullscreen="props.fullscreen"
        :data-place-here="props.placeHere"
        tabindex="-1"
        @keydown.esc="() => !disabledClose.onEsc && close()"
        v-if="state.isOpen"
      >
        <div
          :class="`${prefix}modal`"
          v-bind="$attrs"
          :data-fullscreen="props.fullscreen"
          ref="modalRef"
        >
          <button
            v-if="!disabledClose.onButton"
            @click="close"
            :class="`${prefix}modal-close-button`"
          ></button>
          <slot></slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss"></style>
