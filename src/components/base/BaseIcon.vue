<script setup lang="ts">
import { type PaletteColor, paletteColor } from "@/utils/paletteColor";
import { defineAsyncComponent, markRaw, watch } from "vue";

const {
  icon,
  color = paletteColor("primary"),
  button,
  disabled,
} = defineProps<{
  icon: string;
  color?: PaletteColor;
  button?: boolean;
  disabled?: boolean;
}>();

let component = $ref("");

const attrs: Record<string, unknown> = {};
if (button) {
  if (disabled) attrs.disabled = true;
  else attrs.tabindex = 0;
}

watch(
  () => icon,
  (icon) =>
    (component = markRaw(
      defineAsyncComponent({
        loader: () => import(`../icons/${icon}.vue`),
      })
    )),
  { immediate: true }
);
</script>

<template>
  <component
    :class="{
      'base-icon-component': true,
      'base-icon-component-button': button,
    }"
    :is="component"
    v-bind="attrs"
  />
</template>

<style scoped lang="scss">
.base-icon-component {
  color: v-bind("color.base.value");
}
.base-icon-component-button {
  cursor: pointer;
  &:hover {
    color: v-bind("color.strong.value");
  }
  &:active {
    color: v-bind("color.stronger.value");
  }
}
.base-icon-component-button[disabled="true"] {
  cursor: initial;
  color: v-bind("color.fade.value") !important;
}
</style>
