<template>
  <main-navigation />
  <main class="container">
    <router-view />
  </main>
</template>

<script>
import MainNavigation from './components/MainNavigation.vue';

export default {
  name: "App",
  components: {
    MainNavigation
  },
};
</script>

<style lang="scss"></style>
