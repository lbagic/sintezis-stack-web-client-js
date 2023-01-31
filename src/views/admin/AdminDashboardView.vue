<script setup>
import { NStatistic } from "naive-ui";

const data = {
  Users: 23,
  Bookings: 381,
};
</script>

<template>
  <div class="snt-container snt-grid">
    <p>Overview:</p>
    <div class="snt-grid-fill">
      <NStatistic
        v-for="(value, key) in data"
        :key="key"
        class="snt-card primary"
        :label="key"
      >
        {{ value }}
      </NStatistic>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
