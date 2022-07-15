<template>
  <header>
    <nav class="main-navigation">
      <router-link to="/" class="link">Home</router-link>
      <router-link to="/grid" class="link">Grid Example</router-link>
      <router-link to="/" class="link">Logout</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: "MainNavigation",
};
</script>

<style scoped lang="scss">
.main-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}
</style>
