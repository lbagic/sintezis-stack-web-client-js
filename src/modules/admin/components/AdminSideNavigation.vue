<script setup>
import { adminResources } from "../adminResources";
import { useAdminStore } from "../adminStore";

const adminStore = useAdminStore();
</script>

<template>
  <Transition name="transition">
    <aside class="admin-side-nav" v-if="adminStore.showSideNav">
      <ul class="snt-grid snt-container">
        <li v-for="resource in adminResources" :key="resource.id">
          <RouterLink
            :to="`/crud/${resource.id}`"
            class="snt-flex snt-button text dark underline"
            style="display: inline-flex"
          >
            <component height="100%" width="20px" :is="resource.icon" />
            <p>{{ resource.name }}</p>
          </RouterLink>
        </li>
      </ul>
    </aside>
  </Transition>
</template>

<style scoped lang="scss">
.admin-side-nav {
  width: 150px;
  overflow-y: auto;
  background: linear-gradient(
    120deg,
    var(--snt-color-primary-lightest) 0%,
    var(--snt-color-primary-lightest-2) 100%
  );
  box-shadow: var(--snt-shadow-3);
}
.transition {
  @include transition(all 0.4s cubic-bezier(0.8, 0.4, 0.2, 0.8)) {
    opacity: 0;
    width: 0px;
  }
}
</style>
