<script setup lang="ts">
import {
  type PaletteColor,
  type PaletteVariant,
  colorPalette,
} from "@/utils/colorPalette";
import { defineAsyncComponent, markRaw, watch, watchEffect } from "vue";

const {
  icon,
  colorName = "primary",
  colorVariant,
  button,
  disabled,
} = defineProps<{
  icon: string;
  colorName?: PaletteColor;
  colorVariant?: PaletteVariant;
  button?: boolean;
  disabled?: boolean;
}>();

let component = $ref("");
let reference = $ref(null);
const palette = colorPalette(colorName, colorVariant);
const attrs: Record<string, unknown> = {};

watchEffect(() => console.log(reference));
if (button) {
  if (disabled) attrs.disabled = true;
  else attrs.tabindex = 0;
}

// console.log(component);

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
    ref="reference"
  />
</template>

<style scoped lang="scss">
.base-icon-component {
  color: v-bind("palette.base.value");
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
