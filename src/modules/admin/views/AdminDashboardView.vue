<script setup>
import { adminResources } from "../adminResources";

const data = {
  Users: 23,
  Bookings: 381,
};
</script>

<template>
  <div class="snt-container snt-grid">
    <p>Overview:</p>
    <div class="snt-grid-fill">
      <div v-for="(value, key) in data" :key="key" class="snt-card primary">
        <p style="font-size: 20px">{{ value }}</p>
        <p style="font-size: 11px; color: var(--snt-color-grey)">{{ key }}</p>
      </div>
    </div>
    <p>Resources:</p>
    <div class="snt-flex-wrap">
      <RouterLink
        class="snt-link primary"
        v-for="resource in adminResources"
        :key="resource.id"
        :to="`/crud/${resource.id}`"
        >{{ resource.displayName }}</RouterLink
      >
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
