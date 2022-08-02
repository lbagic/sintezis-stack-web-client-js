<script>
export default {
  inheritAttrs: false,
};
</script>

<script setup>
import { useCssVar } from "@vueuse/core";
import { onMounted } from "vue";
import { css } from "../../utils/css.js";

const prefix = useCssVar("--prefix");
const modalRef = $ref(null);
const wrapperRef = $ref(null);
const colorNames = Object.keys(css.colors);
const colorFilter = (name) => colorNames.includes(name);

const props = defineProps({
  fullscreen: Boolean,
  placeHere: Boolean,
  center: Boolean,
});

onMounted(() => {
  const colors = [...modalRef.classList].filter(colorFilter);
  wrapperRef.classList.add(...colors);
});
</script>

<template>
  <Teleport to="body" :disabled="props.placeHere">
    <div
      :class="`${prefix}modal-wrapper`"
      ref="wrapperRef"
      :data-fullscreen="props.fullscreen"
      :data-place-here="props.placeHere"
      :data-center="props.center"
    >
      <div
        :class="`${prefix}modal`"
        v-bind="$attrs"
        :data-fullscreen="props.fullscreen"
        ref="modalRef"
      >
        <button :class="`${prefix}modal-close-button`"></button>
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss"></style>
