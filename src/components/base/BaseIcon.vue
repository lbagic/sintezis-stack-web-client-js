<script setup lang="ts">
import type { PaletteColors } from "@/utils/colors";
import { palettePicker, type PaletteVariants } from "@/utils/colors";
import { defineAsyncComponent, markRaw, watch } from "vue";

const {
  icon,
  color = "primary",
  colorVariant = "dark",
  button,
  disabled,
} = defineProps<{
  icon: string;
  color?: PaletteColors;
  colorVariant?: PaletteVariants;
  button?: boolean;
  disabled?: boolean;
}>();

let component = $ref("");
const palette = palettePicker(color, colorVariant);

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
  color: v-bind("palette.color.value");
}
.base-icon-component-button {
  cursor: pointer;
  &:hover {
    color: v-bind("palette.strong.value");
  }
  &:active {
    color: v-bind("palette.stronger.value");
  }
}
.base-icon-component-button[disabled="true"] {
  cursor: initial;
  color: v-bind("palette.fade.value") !important;
}
</style>
