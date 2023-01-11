<script setup lang="ts">
import { lifecycleHooks } from "@/hooks";
import { NConfigProvider } from "naive-ui";
import { theme } from "./app/theme";

lifecycleHooks.onOpened();
window.addEventListener("beforeunload", lifecycleHooks.onClosed);
</script>

<template>
  <NConfigProvider :theme-overrides="theme" style="height: 100%">
    <RouterView />
  </NConfigProvider>
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
