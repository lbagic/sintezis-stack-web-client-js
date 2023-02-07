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
  { name: ROLES.enum.Administrator },
  { name: ROLES.enum.User, disabled: true },
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
    @select="(_, { payload }: any) => login.execute(payload)"
    v-if="!$prod"
  >
    <button style="margin-top: 1rem" class="snt-button text primary">
      Test login
    </button>
  </NDropdown>
</template>

<style scoped lang="scss"></style>
