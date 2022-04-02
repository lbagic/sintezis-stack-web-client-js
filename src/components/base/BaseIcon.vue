<script setup lang="ts">
import { prefix } from "@/utils/useCss";
import { defineAsyncComponent, markRaw, watch } from "vue";
import {
  usePalette,
  type PaletteColor,
  type PaletteVariant,
} from "../../utils/usePalette";

const props = defineProps<{
  icon: string;
  button?: boolean;
  disabled?: boolean;
  color?: PaletteColor;
  variant?: PaletteVariant;
}>();
const { icon, button, disabled } = props;

let component = $ref("");
const attrs: Record<string, unknown> = {};
const palette = usePalette(props);

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
    :class="`${prefix}icon`"
    :data-button="button"
    :is="component"
    v-bind="attrs"
  />
</template>

<style scoped lang="scss">
.#{$prefix}icon {
  color: v-bind("palette.base");
}
.#{$prefix}icon[data-button="true"] {
  cursor: pointer;
  &:hover {
    color: v-bind("palette.strong");
  }
  &:active {
    color: v-bind("palette.stronger");
  }
}
.#{$prefix}icon[data-button="true"][disabled="true"] {
  cursor: initial;
  color: v-bind("palette.opaque") !important;
}
</style>
