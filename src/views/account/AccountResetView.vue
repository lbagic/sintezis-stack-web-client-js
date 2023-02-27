<script setup lang="ts">
import BaseInput from "@/components/base/input/BaseInput.vue";
import { useForm } from "@/components/base/input/formController";
import { grpc } from "@/services/api/grpc";
import { useMessage } from "naive-ui";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const message = useMessage();
const form = useForm(
  {
    email: (route.query.email as string) ?? "",
    recoveryToken: (route.query.token as string) ?? "",
    password: "",
    passwordConfirmation: "",
  },
  {
    action: grpc.AccountService.passwordReset,
    onError: () => message.error("Failed to recover password"),
    onSuccess: () => {
      message.success("Password reset successfully");
      router.push("/login");
    },
  }
);
</script>

<template>
  <form @submit.prevent class="snt-grid justify-items-start">
    <h2 class="subtitle">Reset password</h2>

    <div class="snt-grid tiny width-xs">
      <BaseInput
        :constraint="{ required: true, type: 'email' }"
        :input-props="{ name: 'username', autocomplete: 'username' }"
        label="Email"
        :disabled="!!route.query.email"
        placeholder="john.doe@mail.com"
        v-model="form.model.email"
      />
      <BaseInput
        :constraint="{ required: true }"
        label="Recovery token"
        :disabled="!!route.query.token"
        v-model="form.model.recoveryToken"
      />
      <BaseInput
        v-model="form.model.password"
        type="password"
        show-password-on="click"
        :constraint="{ required: true, minlength: 6 }"
        :input-props="{
          name: 'password',
          autocomplete: 'off',
        }"
        label="New password"
      />
      <BaseInput
        v-model="form.model.passwordConfirmation"
        type="password"
        show-password-on="click"
        :constraint="{
          required: true,
          pattern: form.data.password,
        }"
        :input-props="{
          name: 'confirm-password',
          autocomplete: 'off',
        }"
        label="Confirm password"
      />
    </div>
    <button
      :disabled="!form.isSubmittable"
      @click="form.submit"
      class="snt-button primary"
    >
      Submit
    </button>
    <p>
      <RouterLink
        class="snt-button text primary animate-underline"
        :to="{
          path: '/login',
          query: form.data.email ? { email: form.data.email } : {},
        }"
      >
        Back to login
      </RouterLink>
    </p>
  </form>
</template>

<style scoped lang="scss"></style>
