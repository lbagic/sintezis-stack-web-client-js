<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <nav>
    <RouterLink to="/">
      <img
        alt="Vue logo"
        class="logo"
        src="@/assets/logo.svg"
        width="25"
        height="25"
      />
      <p style="margin-left: 0.5rem">Home</p>
    </RouterLink>
    <RouterLink to="/test" style="margin-left: auto">Test</RouterLink>
  </nav>
</template>

<style scoped lang="scss">
nav {
  display: flex;
  padding: 1rem;
}
a {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-flex;
  align-items: center;
  padding: 0 1rem;
}
</style>
