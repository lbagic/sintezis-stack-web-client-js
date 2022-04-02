<script setup lang="ts">
import {
  usePalette,
  type PaletteColor,
  type PaletteVariant,
} from "@/utils/usePalette";

const props = defineProps<{
  color?: PaletteColor;
  variant?: PaletteVariant;
  to?: string;
}>();
const palette = usePalette(props);
const component = props.to ? "router-link" : "button";
const attrs: Record<string, string> = {};
if (props.to) attrs.to = props.to;
</script>

<template>
  <component
    :is="component"
    class="base-button-component"
    :data-component="component"
    v-bind="attrs"
    ><slot></slot
  ></component>
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
    color: v-bind("palette.contrast");
    cursor: pointer;
    background: v-bind("palette.base");
    &:hover {
      background: v-bind("palette.strong");
    }
    &:active {
      background: v-bind("palette.stronger");
    }
  }
  &[disabled] {
    cursor: default !important;
    color: #eee !important;
    background: v-bind("palette.opaque") !important;
    pointer-events: none !important;
  }
}
.base-button-component[data-component="router-link"] {
  text-decoration: none;
}
</style>
