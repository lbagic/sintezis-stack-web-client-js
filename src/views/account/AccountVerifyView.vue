<script setup lang="ts">
import { useAccountService } from "@/modules/account/accountService";
import { useMessage } from "naive-ui";
import { ref } from "vue";
import { useRoute } from "vue-router";

const account = useAccountService();
const message = useMessage();
const route = useRoute();
const { email, token } = route.query as Record<any, string>;
const error = ref(true);
async function verifyAccount() {
  try {
    if (!email || !token) throw new Error();
    await account.verifyAccount({ email, token });
    message.success("Account verified.");
    message.success("Logged in.");
  } catch (err) {
    error.value = true;
    message.error("Failed to verify account.");
  }
}
verifyAccount();
</script>

<template>
  <form @submit.prevent class="snt-grid justify-items-start">
    <h2 class="subtitle">Verify account</h2>
    <p>
      Please wait while we verify your account. You will be redirected shortly.
    </p>
    <p v-if="error" style="color: var(--snt-color-error); font-size: 14px">
      There was a problem verifying your account, please check your mail and try
      again later.
    </p>
    <RouterLink
      class="snt-button text primary animate-underline"
      :to="{
        name: 'login',
        query: route.query.email ? { email: route.query.email } : {},
      }"
    >
      Back to login
    </RouterLink>
  </form>
</template>

<style scoped lang="scss"></style>
