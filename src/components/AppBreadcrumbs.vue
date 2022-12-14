<script setup>
import { watchEffect } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
let breadcrumbs = $ref([]);
watchEffect(() => (breadcrumbs = route.meta.breadcrumbs?.(route.params) ?? []));
</script>

<template>
  <template
    v-for="({ name, routeName }, index) in breadcrumbs"
    :key="routeName"
  >
    <p v-if="index !== 0">&middot;</p>
    <RouterLink
      :class="`${$prefix}button text white underline`"
      :to="{ name: routeName }"
      >{{ name }}</RouterLink
    >
  </template>
</template>

<style scoped lang="scss"></style>
