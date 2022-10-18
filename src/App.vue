<script setup>
import BaseToast from "./components/base/BaseToast.vue";
</script>

<template>
  <RouterView />
  <BaseToast />
</template>

<style lang="scss">
@import "@/assets/styles/index.scss";

body {
  background: var(--#{$prefix}color-background);
  color: var(--#{$prefix}color-text);
}
#app {
  height: 100%;
}
</style>
