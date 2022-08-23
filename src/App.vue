<script setup>
import BaseToast from "./components/base/BaseToast.vue";
import AppNavigation from "./components/AppNavigation.vue";
</script>

<template>
  <header>
    <AppNavigation />
  </header>

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
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 100%;
}
</style>
