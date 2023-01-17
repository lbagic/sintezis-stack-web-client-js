<script setup lang="ts">
import { useRoute } from "vue-router";
import { adminResources } from "@/modules/admin/adminResources";

const resourceId = useRoute().params.resourceId as string;
const component = adminResources[resourceId].component;
</script>

<template>
  <main class="snt-container snt-grid">
    <component :is="component" />
  </main>
</template>

<style scoped lang="scss"></style>
