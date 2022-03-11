<script setup lang="ts">
import type { PaletteColors } from "@/utils/colors";
import { palettePicker, type PaletteVariants } from "@/utils/colors";

const { color = "primary", colorVariant = "dark" } = defineProps<{
  color?: PaletteColors;
  colorVariant?: PaletteVariants;
}>();

const palette = palettePicker(color, colorVariant);
</script>

<template>
  <button class="base-button-component"><slot></slot></button>
</template>

<style scoped lang="scss">
.base-button-component {
  --height: var(--snt-button-and-input-height);
  --padding: 8px 24px;
  --padding-small: 8px 12px;
  --padding-large: 12px 48px;

  display: inline-flex;
  cursor: pointer;
  font-weight: 400;
  text-align: center;
  justify-content: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: 1.5px solid transparent;
  padding: var(--padding);
  font-size: 16px;
  line-height: 1.5;
  border-radius: 2px;
  transition-timing-function: ease-in-out;
  transition-duration: 0.15s;
  transition-property: color, background-color, border-color, box-shadow,
    opacity;
  opacity: 1;

  &:not([disabled]) {
    color: v-bind("palette.text.value");
    cursor: pointer;
    background: v-bind("palette.color.value");
    &:hover {
      background: v-bind("palette.strong.value");
    }
    &:active {
      background: v-bind("palette.stronger.value");
    }
  }
  &[disabled] {
    cursor: default !important;
    color: #eee !important;
    background: v-bind("palette.fade.value") !important;
    pointer-events: none !important;
  }
}
</style>
