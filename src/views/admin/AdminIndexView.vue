<script setup lang="ts">
import { useAccountModule } from "@/modules/account/accountModule";
import { adminResources } from "@/modules/admin/adminResources";
import { useAdminModule } from "@/modules/admin/adminModule";
import { css } from "@/utils/css";
import { useRouteBreadcrumbs } from "@/utils/routeBreadcrumbs";
import {
  PowerSettingsNewOutlined,
  SpaceDashboardOutlined,
} from "@vicons/material";
import {
  NBreadcrumb,
  NBreadcrumbItem,
  NLayout,
  NLayoutSider,
  NMenu,
  useDialog,
  type MenuOption,
} from "naive-ui";
import { computed, h } from "vue";
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();
const dialog = useDialog();
const adminStore = useAdminModule();
const account = useAccountModule();
const logout = account.useLogout();
const breadcrumbs = useRouteBreadcrumbs();
const activePath = computed(() => route.path);

const sideMenuOptions = Object.keys(adminResources).map(
  (id): MenuOption => ({
    key: `/resource/${id}`,
    label: () =>
      h(RouterLink, { to: `/resource/${id}` }, { default: () => id }),
    icon: () => h(adminResources[id].icon),
  })
);
function confirmLogout() {
  dialog.warning({
    content: "Are you sure you want to logout?",
    title: "Logout",
    positiveText: "Yes",
    negativeText: "No, not yet",
    onPositiveClick: logout,
  });
}
</script>

<template>
  <div class="admin-index">
    <nav class="admin-nav-main snt-container small">
      <RouterLink
        class="snt-button text white"
        to="/"
        title="dashboard"
        aria-label="dashboard"
      >
        <SpaceDashboardOutlined width="28" height="28" />
      </RouterLink>
      <NBreadcrumb
        :theme-overrides="{
          itemTextColor: css.color.white.base,
          separatorColor: css.color.white.base,
          itemTextColorActive: css.color.white.base,
          itemTextColorHover: css.color.white.base,
        }"
      >
        <NBreadcrumbItem v-if="!breadcrumbs.length">
          <RouterLink
            class="snt-button text white animate-underline-exact-active"
            to="/"
          >
            Dashboard
          </RouterLink>
        </NBreadcrumbItem>
        <NBreadcrumbItem
          v-else
          v-for="breadcrumb in breadcrumbs"
          :key="breadcrumb.label"
        >
          <RouterLink
            class="snt-button text white animate-underline-exact-active"
            :to="breadcrumb.to"
          >
            {{ breadcrumb.label }}
          </RouterLink>
        </NBreadcrumbItem>
      </NBreadcrumb>

      <button
        class="snt-button text white justify-self-end"
        @click="confirmLogout"
        title="logout"
        aria-label="logout"
      >
        <PowerSettingsNewOutlined width="22" height="22" />
      </button>
    </nav>
    <NLayout has-sider style="height: 100%">
      <NLayoutSider
        trigger-style="top: 10%;"
        collapsed-trigger-style="top: 10%;"
        bordered
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :collapsed="!adminStore.showSideNav"
        show-trigger
        @collapse="adminStore.showSideNav = false"
        @expand="adminStore.showSideNav = true"
      >
        <NMenu
          :options="sideMenuOptions"
          :value="activePath"
          :collapsed="!adminStore.showSideNav"
          :collapsed-width="64"
          :collapsed-icon-size="22"
        />
      </NLayoutSider>
      <NLayout>
        <RouterView :key="route.path"></RouterView>
      </NLayout>
    </NLayout>
  </div>
</template>

<style scoped lang="scss">
.admin-index {
  display: grid;
  height: 100%;
  grid-template-rows: auto 1fr;
}
.admin-nav-main {
  color: white;
  background: linear-gradient(
    150deg,
    var(--snt-color-primary-dark) 0%,
    var(--snt-color-primary-dark-2) 100%
  );
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 1rem;
  align-items: center;
  justify-items: flex-start;
}
</style>
