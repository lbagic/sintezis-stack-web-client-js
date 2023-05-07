<script setup lang="ts">
import { useAccountModule } from "@/modules/account/accountModule";
import { grpc } from "@/services/api/grpc";
import { useDialog, useMessage } from "naive-ui";
import { h, onMounted } from "vue";
import { useRoute } from "vue-router";

const account = useAccountModule();
const route = useRoute();
const message = useMessage();
const dialog = useDialog();
const { email, token } = route.query as Record<any, string>;

async function verifyAccount() {
  try {
    if (!email || !token) throw new Error();
    const response = await grpc.AccountService.verifyAccount({
      email,
      token,
    });
    account.handleLogin(response);
    message.success("Account verified. Logged in.");
  } catch (error) {
    dialog.error({
      title: "Account verification",
      content:
        "There was a problem verifying your account, please check your mail and try again later.",
      action: () =>
        h(
          "a",
          {
            class: "snt-button text primary animate-underline",
            href: "mailto:",
            target: "_blank",
            rel: "noopener noreferrer",
          },
          { default: () => "Open mail" }
        ),
    });
  }
}
onMounted(verifyAccount);
</script>

<template>
  <form @submit.prevent class="snt-grid justify-items-start">
    <h2 class="subtitle">Verify account</h2>
    <p>
      Please wait while we verify your account. You will be redirected shortly.
    </p>
    <RouterLink
      class="snt-button text primary animate-underline"
      :to="{
        path: '/login',
        query: route.query.email ? { email: route.query.email } : {},
      }"
    >
      Back to login
    </RouterLink>
  </form>
</template>

<style scoped lang="scss"></style>
