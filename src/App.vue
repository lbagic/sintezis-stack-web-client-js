<script setup lang="ts">
import { RouterView } from "vue-router";
import Navigation from "./components/Navigation.vue";
</script>

<template>
  <Navigation />
  <RouterView />
</template>

<style lang="scss">
@import "@/assets/base.css";
@import "@/assets/styles/_index.scss";
#app {
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 100%;
}
</style>
