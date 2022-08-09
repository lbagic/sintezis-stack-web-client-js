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
  local: props.local,
  expand: props.expand,
  keepAlive: props.keepAlive,
});

if (!disabledClose.onClickOutside) onClickOutside(modalRef, close);

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
        tabindex="-1"
        @keydown.esc="() => !disabledClose.onEsc && close()"
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
