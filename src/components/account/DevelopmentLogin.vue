<script setup lang="ts">
import { ROLES } from "@/enums/ROLES";
import { intl } from "@/internationalization/intl";
import { useAccountModule } from "@/modules/account/accountModule";
import { usePromise } from "@/utils/usePromise";
import { NDropdown } from "naive-ui";
import type { DropdownMixedOption } from "naive-ui/es/dropdown/src/interface";

const account = useAccountModule();
const login = usePromise((data: any) => account.login(data));

const config = {
  [ROLES.enum.Admin]: {
    email: "administrator@sintezis.co",
    password: "secret",
    disabled: false,
  },
  [ROLES.enum.User]: {
    email: "user@sintezis.co",
    password: "secret",
    disabled: true,
  },
  [ROLES.enum.Guest]: {
    email: "guest@sintezis.co",
    password: "secret",
    disabled: true,
  },
};

const options: DropdownMixedOption[] = ROLES.keys.map((key) => {
  const role = config[key];
  const label = intl.value.roles[key];
  return {
    key,
    label,
    payload: { email: role.email, password: role.password },
    disabled: role.disabled,
  };
});
</script>

<template>
  <NDropdown
    :options="options"
    :disabled="login.isPending"
    @select="(_, { payload }: any) => login.execute(payload)"
    v-if="!$prod"
  >
    <button
      class="snt-button text primary"
      type="button"
      :disabled="login.isPending"
    >
      Quick login
    </button>
  </NDropdown>
</template>

<style scoped lang="scss"></style>
