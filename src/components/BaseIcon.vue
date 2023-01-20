<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const props = defineProps<{ icon: string }>();
const icon = defineAsyncComponent(() => import(`./icons/${props.icon}.vue`));
</script>

<template>
  <component :is="icon" />
</template>

<style scoped lang="scss"></style>
