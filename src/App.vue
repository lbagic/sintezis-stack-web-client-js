<script setup lang="ts">
import { theme } from "@/app/theme";
import { lifecycleHooks } from "@/hooks";
import {
  NConfigProvider,
  NDialogProvider,
  NMessageProvider,
  NNotificationProvider,
} from "naive-ui";

lifecycleHooks.onOpened();
window.addEventListener("beforeunload", lifecycleHooks.onClosed);
</script>

<template>
  <NConfigProvider :theme-overrides="theme" style="height: 100%">
    <NDialogProvider>
      <NMessageProvider>
        <NNotificationProvider>
          <RouterView />
        </NNotificationProvider>
      </NMessageProvider>
    </NDialogProvider>
  </NConfigProvider>
</template>

<style lang="scss">
@import "@/assets/styles/index.scss";

body {
  background: var(--#{$prefix}base-color-background);
  color: var(--#{$prefix}base-color-text);
}
</style>
