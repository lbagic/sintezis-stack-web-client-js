<script setup></script>

<template>
  <nav class="app-navigation-wrapper snt-container snt-flex">
    <RouterLink class="snt-link primary" to="/">Home</RouterLink>
    <RouterLink class="snt-link primary" to="/test">Test</RouterLink>
    <RouterLink class="snt-link danger" style="margin-left: auto" to="/login"
      >Login</RouterLink
    >
  </nav>
</template>

<style scoped lang="scss">
.app-navigation-wrapper {
  background: linear-gradient(
    150deg,
    var(--snt-color-primary-dark) 0%,
    var(--snt-color-primary-light) 100%
  );
  box-shadow: var(--snt-shadow-3);
  color: white;
}
</style>
