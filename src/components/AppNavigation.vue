<script setup></script>

<template>
  <nav class="app-navigation-wrapper">
    <RouterLink class="snt-link primary" to="/">Home</RouterLink>
    <RouterLink class="snt-link primary" to="/test">Test</RouterLink>
    <RouterLink class="snt-link danger" style="margin-left: auto" to="/login"
      >Login</RouterLink
    >
  </nav>
</template>

<style scoped lang="scss">
.app-navigation-wrapper {
  background: var(--#{$prefix}color-light-dark);
  height: 50px;
  display: flex;
  align-items: center;
  padding: 1rem;
  & > * + * {
    margin-left: 0.5rem;
  }
}
</style>
