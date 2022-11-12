<script setup>
import { onMounted } from "vue";
import { adminState } from "../adminState";
import AdminNavigation from "../components/AdminNavigation.vue";
import AdminSideNavigation from "../components/AdminSideNavigation.vue";

onMounted(() => (adminState.sideNavOpen = true));
</script>

<template>
  <div class="admin-index">
    <AdminNavigation style="grid-area: nav" />
    <AdminSideNavigation style="grid-area: side-nav" />
    <RouterView style="grid-area: main"></RouterView>
  </div>
</template>

<style scoped lang="scss">
.admin-index {
  display: grid;
  height: 100%;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas: "nav nav" "side-nav main";
}
</style>
