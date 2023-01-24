<script setup lang="ts">
import { routes } from "@/routes/development/routes";
const childRoutes = routes.find((el) => el.path === "/docs")?.children ?? [];
</script>

<template>
  <div style="display: grid; grid-template-columns: auto 1fr; height: 100%">
    <aside
      style="background: var(--snt-color-primary); padding-top: 1rem"
      class="snt-grid"
    >
      <RouterLink
        v-for="{ path } in childRoutes"
        :to="`/docs/${path}`"
        style="padding: 0 2rem"
        :key="path"
        class="snt-button white text animate-underline-active"
        >{{ path }}</RouterLink
      >
    </aside>
    <main class="snt-container" style="overflow-y: auto">
      <RouterView></RouterView>
    </main>
  </div>
</template>

<style scoped lang="scss"></style>
