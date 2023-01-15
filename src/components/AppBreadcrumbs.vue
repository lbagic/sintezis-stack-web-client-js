<script setup lang="ts">
import { useRouteBreadcrumbs } from "@/utils/routeBreadcrumbs";

const breadcrumbs = useRouteBreadcrumbs();
</script>

<template>
  <template v-for="({ label, to }, index) in breadcrumbs" :key="to">
    <slot></slot>
    <p v-if="index !== 0">&middot;</p>
    <RouterLink :class="`${$prefix}button text white underline`" :to="to">{{
      label
    }}</RouterLink>
  </template>
</template>

<style scoped lang="scss"></style>
