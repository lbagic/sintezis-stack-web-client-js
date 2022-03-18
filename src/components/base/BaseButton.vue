<script setup lang="ts">
import { type PaletteColor, paletteColor } from "@/utils/paletteColor";

const { color = paletteColor("primary") } = defineProps<{
  color?: PaletteColor;
}>();
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
    color: v-bind("color.text.value");
    cursor: pointer;
    background: v-bind("color.base.value");
    &:hover {
      background: v-bind("color.strong.value");
    }
    &:active {
      background: v-bind("color.stronger.value");
    }
  }
  &[disabled] {
    cursor: default !important;
    color: #eee !important;
    background: v-bind("color.fade.value") !important;
    pointer-events: none !important;
  }
}
</style>
