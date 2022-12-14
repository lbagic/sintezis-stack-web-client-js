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

<style scoped lang="scss"></style>
