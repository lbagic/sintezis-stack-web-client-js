<script setup lang="ts">
import { useAccountStore } from "@/modules/account/accountStore";
import { NDropdown } from "naive-ui";

const account = useAccountStore();
</script>

<template>
  <NDropdown
    :options="
      ['user', 'guest', 'admin'].map((role) => ({
        label: `As ${role}`,
        key: role,
      }))
    "
    @select="
      (_, { key }: any) => account.login({ email: `${key}@sintezis.co`, password: 'secret' })
    "
    v-if="$dev"
  >
    <button style="margin-top: 1rem" class="snt-button text accent">
      Test login
    </button>
  </NDropdown>
</template>

<style scoped lang="scss"></style>
