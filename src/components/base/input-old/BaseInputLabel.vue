<script></script>

<script setup>
import { mergeProps, useAttrs } from "vue";

const attrs = useAttrs();
const props = defineProps({
  position: String,
  requiredAsterisk: Boolean,
});

const attributes = $computed(() => {
  const base = {};
  if (props.position) base["data-label-position"] = props.position;
  if (props.requiredAsterisk) base["data-label-asterisk"] = true;
  return mergeProps(attrs, base);
});
</script>

<template>
  <label v-bind="attributes" :class="`${$prefix}input-label`">
    <slot></slot>
  </label>
</template>

<style scoped lang="scss">
.#{$prefix}input-label {
  white-space: nowrap;
  --label-margin: 0.25rem;

  &[data-label-asterisk="true"]::after {
    content: "*";
    color: var(--#{$prefix}color-error);
  }

  &[data-label-position="left"],
  &[data-label-position="right"] {
    display: inline;
  }
  &[data-label-position="left"] {
    margin-right: var(--label-margin);
  }
  &[data-label-position="right"] {
    margin-left: var(--label-margin);
  }
  &[data-label-position="top"] {
    margin-bottom: var(--label-margin);
  }
  &[data-label-position="bottom"] {
    margin-top: var(--label-margin);
  }
}
</style>
