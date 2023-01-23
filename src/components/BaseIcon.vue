<script setup lang="ts">
import { computed, defineAsyncComponent } from "vue";

const props = defineProps<{
  icon: string;
  size?: string | number;
}>();
const icon = defineAsyncComponent(() => import(`./icons/${props.icon}.vue`));
const attrs = computed(() => {
  return {
    width: props.size,
    height: props.size,
  };
});
</script>

<template>
  <component :is="icon" v-bind="attrs" />
</template>

<style scoped lang="scss"></style>
