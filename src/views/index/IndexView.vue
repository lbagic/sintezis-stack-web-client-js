<script setup lang="ts">
import { useAccountService } from "@/modules/account/accountService";
import { RouterLink } from "vue-router";

const account = useAccountService();
const logout = account.useLogout();
</script>

<template>
  <div data-view="index-view">
    <p>IndexView</p>
    <RouterLink to="login">Login</RouterLink>
    <button @click="logout">Logout</button>
    <RouterView></RouterView>
  </div>
</template>

<style scoped lang="scss"></style>
