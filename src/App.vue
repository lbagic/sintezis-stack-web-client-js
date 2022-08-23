<script setup>
import { RouterLink, RouterView } from "vue-router";
import BaseToast from "./components/base/BaseToast.vue";
</script>

<template>
  <header>
    <nav>
      <RouterLink class="snt-button primary" to="/">Home</RouterLink>
      <RouterLink class="snt-button secondary" to="/login">Login</RouterLink>
      <RouterLink class="snt-button success outline" to="/items"
        >Items</RouterLink
      >
      <RouterLink class="snt-button danger text" to="/test">Test</RouterLink>
    </nav>
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
