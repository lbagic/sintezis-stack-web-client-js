<script setup>
import BaseModal from "@/components/base/modal/BaseModal.vue";
import { modal } from "@/components/base/modal/modal.ctl";
import { useAccountStore } from "@/modules/account/accountStore";
import { breakpoint } from "@/utils/breakpoint";
import { useRoute } from "vue-router";
import { adminResources } from "../adminResources";
import { useAdminStore } from "../adminStore";
import AdminIconPower from "./icons/AdminIconPower.vue";

const adminStore = useAdminStore();
const route = useRoute();
const breadcrumbs = $computed(() => {
  const list = [{ name: "Dashboard", to: "/" }];
  const resourceId = route.params.resourceId;
  const resource = adminResources.find((el) => el.id === resourceId);
  if (resource) {
    list.push({ name: resource.name, to: `/crud/${resourceId}` });
    if (route.path.includes(`${resourceId}/details`))
      list.push({ name: `Details`, to: `/crud/${resourceId}/details` });
  }
  return list;
});
const accountStore = useAccountStore();
const isSmallScreen = breakpoint.smaller("s");
</script>

<template>
  <nav class="admin-nav snt-container snt-flex">
    <button
      class="admin-nav-burger"
      :data-active="adminStore.showSideNav"
      @click="adminStore.showSideNav = !adminStore.showSideNav"
    >
      <div></div>
      <div></div>
      <div></div>
    </button>
    <template v-for="(crumb, index) in breadcrumbs" :key="crumb">
      <p v-if="index !== 0">&middot;</p>
      <RouterLink class="snt-button text white underline" :to="crumb.to">{{
        crumb.name
      }}</RouterLink>
    </template>
    <button
      :class="{
        small: isSmallScreen,
        'text underline': !isSmallScreen,
      }"
      class="snt-button white"
      style="margin-left: auto"
      @click="modal.logout.open"
    >
      <AdminIconPower width="24px" height="100%" v-if="isSmallScreen" />
      <span v-else>Logout</span>
    </button>
    <BaseModal name="logout" class="snt-container-s">
      <p>Are you sure you want to log out?</p>
      <div class="snt-flex equals" style="margin-top: 16px">
        <button
          class="snt-button text danger underline small"
          @click="accountStore.logout"
        >
          Yes, logout
        </button>
        <button
          class="snt-button text primary underline small"
          @click="modal.logout.close"
        >
          No
        </button>
      </div>
    </BaseModal>
  </nav>
</template>

<style scoped lang="scss">
.admin-nav {
  color: white;

  background: linear-gradient(
    150deg,
    var(--snt-color-primary-dark) 0%,
    var(--snt-color-primary-light) 100%
  );
  box-shadow: var(--snt-shadow-3);
}
.admin-nav-burger {
  --width: 24px;
  --height: 24px;
  --line-size: 3px;
  border-radius: 1px;
  width: var(--width);
  min-width: var(--width);
  height: var(--height);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  transition: all 0.3s ease;
  position: relative;
  &[data-active="true"] {
    transform: rotate(90deg);
    & > div {
      width: var(--line-size) !important;
      transform: translateX(calc(var(--width) / 2));
    }
  }

  & > div {
    transition: all 0.2s;
    height: var(--line-size);
    border-radius: var(--line-size);
    background: white;
  }
  & > div:nth-child(1) {
    width: 70%;
    animation: 4.5s ease infinite alternate wiggle1;
  }
  & > div:nth-child(2) {
    width: 40%;
    animation: 3.5s ease infinite alternate wiggle2;
  }
  & > div:nth-child(3) {
    width: 100%;
    animation: 4s ease infinite alternate wiggle3;
  }
}

@keyframes wiggle1 {
  0% {
    width: 40%;
  }
  100% {
    width: 85%;
  }
}
@keyframes wiggle2 {
  0% {
    width: 40%;
  }
  100% {
    width: 80%;
  }
}
@keyframes wiggle3 {
  0% {
    width: 50%;
  }
  100% {
    width: 100%;
  }
}
</style>
