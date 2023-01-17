<script setup>
import { adminResources } from "@/modules/admin/adminResources";

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
        class="snt-button text primary underline"
        v-for="(_, id) in adminResources"
        :key="id"
        :to="`/resource/${id}`"
      >
        {{ id }}
      </RouterLink>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
