<template>
  <main-navigation />
  <main>
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
