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
  background: var(--#{$prefix}app-background);
  color: var(--#{$prefix}app-color);
}
#app {
  height: 100%;
}
</style>
