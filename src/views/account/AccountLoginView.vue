<script setup lang="ts">
import DevelopmentLogin from "@/components/account/DevelopmentLogin.vue";
import BaseInput from "@/components/base/input/BaseInput.vue";
import { useForm } from "@/components/base/input/formController";
import { useAccountService } from "@/modules/account/accountService";
import { useMessage } from "naive-ui";
import { useRoute } from "vue-router";

const account = useAccountService();
const message = useMessage();
const route = useRoute();

const form = useForm(
  {
    email: (route.query.email as string) ?? "",
    password: "",
  },
  {
    action: account.login,
    onError: () => message.error("Failed to log in."),
    onSuccess: () => message.success("Logged in successfully."),
  }
);
</script>

<template>
  <form @submit.prevent class="snt-grid justify-items-start">
    <h2 class="subtitle">Login</h2>
    <p>
      Don't have an account?
      <RouterLink
        class="snt-button text primary animate-underline"
        to="register"
      >
        Register here
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
      <BaseInput
        :constraint="{ required: true, minlength: 6 }"
        :input-props="{ name: 'password', autocomplete: 'password' }"
        label="Password"
        type="password"
        show-password-on="click"
        v-model="form.model.password"
      />
    </div>
    <div class="snt-flex">
      <button
        :disabled="!form.isSubmittable"
        @click="form.submit"
        class="snt-button primary"
      >
        Login
      </button>
      <DevelopmentLogin v-if="!$prod" />
    </div>
    <RouterLink
      class="snt-button text primary animate-underline"
      :to="{
        path: '/recover-password',
        query: form.data.email ? { email: form.data.email } : {},
      }"
    >
      Recover password
    </RouterLink>
  </form>
</template>

<style scoped lang="scss"></style>
