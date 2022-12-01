<script setup>
import BaseToast from "./components/base/toast/BaseToast.vue";
import { lifecycleHooks } from "./lifecycleHooks";

lifecycleHooks.onApplicationOpened();
window.addEventListener("beforeunload", () =>
  lifecycleHooks.onApplicationClosed()
);
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
