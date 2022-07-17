<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <nav>
      <RouterLink class="snt-button primary" to="/">Home</RouterLink>
      <RouterLink class="snt-button secondary outline" to="/about"
        >About</RouterLink
      >
    </nav>
  </header>

  <RouterView />
</template>

<style lang="scss">
@import "@/assets/styles/index.scss";

body {
  background: var(--#{$prefix}app-background);
}
#app {
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 100%;
}
</style>
