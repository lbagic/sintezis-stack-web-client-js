<script setup></script>

<template>
  <nav :class="`app-navigation-wrapper ${$prefix}container ${$prefix}flex`">
    <RouterLink :class="`${$prefix}button text white underline`" to="/"
      >Home</RouterLink
    >
    <RouterLink :class="`${$prefix}button text white underline`" to="/test"
      >Test</RouterLink
    >
    <RouterLink
      :class="`${$prefix}button text white underline`"
      style="margin-left: auto"
      to="/login"
      >Login</RouterLink
    >
  </nav>
</template>

<style scoped lang="scss">
.app-navigation-wrapper {
  background: linear-gradient(
    150deg,
    var(--#{$prefix}color-primary-dark) 0%,
    var(--#{$prefix}color-primary-light) 100%
  );
  box-shadow: var(--#{$prefix}shadow-l);
  color: white;
}
</style>
