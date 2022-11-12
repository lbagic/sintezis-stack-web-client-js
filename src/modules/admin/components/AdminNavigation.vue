<script setup>
import BaseModal from "@/components/base/BaseModal.vue";
import { modal } from "@/components/base/modal.ctl";
import { useAccountStore } from "@/modules/account/accountStore";
import { breakpoint } from "@/utils/breakpoint";
import { useRoute } from "vue-router";
import { adminState } from "../adminState";
import AdminIconPower from "./icons/AdminIconPower.vue";
const route = useRoute();
const breadcrumbs = $computed(() => {
  const list = [];
  const serviceName = route.params.serviceName;
  if (serviceName) list.push({ name: serviceName, to: `/crud/${serviceName}` });
  if (route.fullPath.includes(`${serviceName}/details`))
    list.push({ name: `Details`, to: `/crud/${serviceName}/details` });
  return list;
});
const accountStore = useAccountStore();
const isSmallScreen = breakpoint.smaller("s");
</script>

<template>
  <nav class="admin-nav snt-container snt-flex">
    <button
      class="admin-nav-burger"
      :data-active="adminState.sideNavOpen"
      @click="adminState.sideNavOpen = !adminState.sideNavOpen"
    >
      <div></div>
      <div></div>
      <div></div>
    </button>
    <RouterLink class="snt-link white" to="/">Dashboard</RouterLink>
    <template v-for="crumb in breadcrumbs" :key="crumb">
      <p>&middot;</p>
      <RouterLink class="snt-link white" :to="crumb.to">{{
        crumb.name
      }}</RouterLink>
    </template>
    <button
      class="snt-button white rounded small"
      style="margin-left: auto"
      v-if="isSmallScreen"
    >
      <AdminIconPower width="24px" height="100%" />
    </button>
    <button
      class="snt-link white"
      style="margin-left: auto"
      v-else
      @click="modal.logout.open"
    >
      Logout
    </button>
    <BaseModal name="logout" class="snt-container-s">
      <p>Are you sure you want to log out?</p>
      <div class="snt-flex equals" style="margin-top: 16px">
        <button
          class="snt-button small rounded danger"
          @click="accountStore.logout"
        >
          Yes, logout
        </button>
        <button
          class="snt-button small rounded primary"
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
