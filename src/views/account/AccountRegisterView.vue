<script setup lang="ts">
import BaseInput from "@/components/base/input/BaseInput.vue";
import { useFormData } from "@/components/base/input/inputController";
import { useAccountService } from "@/modules/account/accountService";
import { useDialog, useMessage } from "naive-ui";
import { h } from "vue";
import { RouterLink } from "vue-router";

const message = useMessage();
const dialog = useDialog();
const account = useAccountService();
const form = useFormData(
  {
    email: "",
    password: "",
    passwordConfirmation: "",
  },
  account.register,
  {
    onSuccess: () =>
      dialog.success({
        content: "Registration successful, please verify your email address.",
        action: () =>
          h("div", { class: "snt-flex" }, [
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
            h(
              RouterLink,
              {
                class: "snt-button text primary animate-underline",
                to: "login",
              },
              { default: () => "Go to login" }
            ),
          ]),
      }),
    onError: () => message.error("Failed to register."),
  }
);
</script>

<template>
  <form @submit.prevent class="snt-grid justify-items-start">
    <h2 class="subtitle">Register</h2>
    <p>
      Already have an account?
      <RouterLink class="snt-button text primary animate-underline" to="login">
        Go to login
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
      <BaseInput
        :constraint="{ required: true, pattern: form.data.password }"
        :input-props="{ autocomplete: 'off' }"
        show-password-on="click"
        label="Confirm password"
        type="password"
        v-model="form.model.passwordConfirmation"
      />
    </div>
    <button
      :disabled="!form.isSubmittable"
      @click="form.submit"
      class="snt-button primary"
    >
      Register
    </button>
  </form>
</template>

<style scoped lang="scss"></style>
