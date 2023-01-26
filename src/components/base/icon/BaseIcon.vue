<script setup lang="ts">
import { defineAsyncComponent, computed, type Component } from "vue";

const props = defineProps<{
  icon: string | Component;
  is?: string | Component;
  size?: string | number;
  width?: string | number;
  height?: string | number;
}>();

const icon = computed(() =>
  typeof props.icon === "string"
    ? defineAsyncComponent(() => import(`../../icons/${props.icon}.vue`))
    : props.icon
);
const iconAttrs = computed(() => ({
  width: props.size ?? props.width,
  height: props.size ?? props.height,
}));
</script>

<template>
  <component v-if="is" :is="is">
    <component :is="icon" v-bind="iconAttrs" />
  </component>
  <component v-else :is="icon" v-bind="iconAttrs" />
</template>

<style scoped lang="scss"></style>
