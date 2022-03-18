<script setup lang="ts">
import { RouterView } from "vue-router";
import Navigation from "./components/Navigation.vue";
</script>

<template>
  <Navigation />
  <RouterView />
</template>

<style>
@import "@/assets/base.css";
#app {
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 100%;
}
</style>
