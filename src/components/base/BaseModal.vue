<script>
export default {
  inheritAttrs: false,
};
</script>

<script setup>
import { onClickOutside } from "@vueuse/core";
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
import { css } from "../../utils/css.js";
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
    `${instance.type.__name} in "${instance.parent.type.__name}" must have at least one identifier prop: name, hash or query.`
  );
}

const getCssVar = (name) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();
const prefix = getCssVar("--prefix");
const colorNames = Object.keys(css.colors);
const baseZIndex = Number(getCssVar(`--${prefix}z-index-modal`));

const refs = {
  modal: ref(),
  wrapper: ref(),
};

const state = reactive({
  isOpen: false,
  isPaused: false,
  zIndex: baseZIndex,
});

const util = {
  filterColorName: (name) => colorNames.includes(name),
  getFocusElement: () =>
    refs.modal.value.querySelector("[autofocus]") ||
    refs.modal.value.querySelector(
      `a, button:not(.${prefix}modal-close-button), input, textarea, select, summary`
    ) ||
    refs.wrapper.value,
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
  : useFocusTrap(refs.wrapper, { initialFocus: util.getFocusElement });

async function initColor() {
  const color = [...refs.modal.value.classList].find(util.filterColorName);
  if (color) refs.wrapper.value.classList.add(color);
}

if (useClose.onClickOutside) onClickOutside(refs.modal, () => close(false));

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
      <div
        :class="`${prefix}modal-wrapper`"
        :ref="(el) => (refs.wrapper.value = el)"
        :data-expand="props.expand"
        :data-local="props.local"
        :data-paused="state.isPaused"
        tabindex="-1"
        :style="{ zIndex: state.zIndex }"
        @keydown.esc="() => useClose.onEsc && close(false)"
        v-if="state.isOpen || props.keepAlive"
        v-show="state.isOpen || !props.keepAlive"
      >
        <div
          :class="`${prefix}modal`"
          v-bind="$attrs"
          :data-expand="props.expand"
          :ref="(el) => (refs.modal.value = el)"
        >
          <button
            v-if="useClose.onButton"
            @click="close(false)"
            :class="`${prefix}modal-close-button`"
          ></button>
          <slot></slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss"></style>
