<script setup lang="ts">
import BaseInput from "@/components/base/input/BaseInput.vue";
import { useForm } from "@/components/base/input/formController";
import { grpc } from "@/services/api/grpc";
import { useDialog, useMessage } from "naive-ui";
import { h } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const dialog = useDialog();
const message = useMessage();
const form = useForm(
  {
    email: (route.query.email as string) ?? "",
  },
  {
    action: grpc.AccountService.passwordRecover,
    onError: () => message.error("Failed to recover password"),
    onSuccess: () => {
      dialog.success({
        title: "Password recovered",
        content: "Please check your email.",
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
    },
  }
);
</script>

<template>
  <form @submit.prevent class="snt-grid justify-items-start">
    <h2 class="subtitle">Recover password</h2>
    <p>
      Already have a recovery code?
      <RouterLink
        class="snt-button text primary animate-underline"
        to="/reset-password"
      >
        Reset password now.
      </RouterLink>
    </p>
    <div class="snt-grid tiny width-xs">
      <BaseInput
        :constraint="{ required: true, type: 'email' }"
        :input-props="{ name: 'username', autocomplete: 'username' }"
        label="Email"
        placeholder="john.doe@mail.com"
        v-model="form.model.email"
      />
    </div>
    <button
      :disabled="!form.isSubmittable"
      @click="form.submit"
      class="snt-button primary"
    >
      Submit
    </button>
    <RouterLink
      class="snt-button text primary animate-underline"
      :to="{
        path: '/login',
        query: form.data.email ? { email: form.data.email } : {},
      }"
    >
      Back to login
    </RouterLink>
  </form>
</template>

<style scoped lang="scss"></style>
