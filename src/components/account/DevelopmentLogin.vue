<script setup lang="ts">
import { ROLES } from "@/enums/ROLES";
import { useAccountService } from "@/modules/account/accountService";
import { usePromise } from "@/utils/usePromise";
import { NDropdown } from "naive-ui";
import type { DropdownMixedOption } from "naive-ui/es/dropdown/src/interface";

const account = useAccountService();
const login = usePromise((data: any) => account.login(data));

const defaultSuffix = "@sintezis.co";
const defaultPassword = "secret";

const rawOptions: {
  name: string;
  disabled?: boolean;
  suffix?: string;
  password?: string;
}[] = [
  { name: ROLES.enum.Admin },
  { name: ROLES.enum.User },
  { name: ROLES.enum.Guest, disabled: true },
];

const options: DropdownMixedOption[] = rawOptions.map((opt) => ({
  key: opt.name,
  payload: {
    email: `${opt.name.toLowerCase()}${opt.suffix ?? defaultSuffix}`,
    password: opt.password ?? defaultPassword,
  },
  label: `As ${opt.name}`,
  disabled: opt.disabled,
}));
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
