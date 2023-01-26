<script setup lang="ts">
import { ROLES } from "@/enums/ROLES";
import { useAccountStore } from "@/modules/account/accountStore";
import { feedback } from "@/utils/feedback";
import { usePromise } from "@/utils/usePromise";
import { NDropdown } from "naive-ui";
import type { DropdownMixedOption } from "naive-ui/es/dropdown/src/interface";

const account = useAccountStore();
const login = usePromise((data: any) => account.login(data), {
  onError: () => feedback.message.error("Failed to log in."),
});
const defaultSuffix = "@sintezis.co";
const defaultPassword = "secret";

const rawOptions: {
  name: string;
  disabled?: boolean;
  suffix?: string;
  password?: string;
}[] = [
  { name: ROLES.enum.Administrator, disabled: true },
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
    @select="(_, { payload }: any) => login.execute(payload)"
    v-if="!$prod"
  >
    <button style="margin-top: 1rem" class="snt-button text accent">
      Test login
    </button>
  </NDropdown>
</template>

<style scoped lang="scss"></style>
