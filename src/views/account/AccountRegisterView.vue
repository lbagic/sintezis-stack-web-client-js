<script setup lang="ts">
import BaseInput from "@/components/base/input/BaseInput.vue";
import { useForm } from "@/components/base/input/formController";
import { grpc } from "@/services/api/grpc";
import { useDialog, useMessage } from "naive-ui";
import { h } from "vue";
import { RouterLink } from "vue-router";

const message = useMessage();
const dialog = useDialog();
const form = useForm(
  {
    email: "",
    password: "",
    passwordConfirmation: "",
  },
  {
    action: grpc.AccountService.register,
    onError: () => message.error("Failed to register."),
    onSuccess: () => {
      const successDialog = dialog.success({
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
                to: "/login",
                onClick: successDialog.destroy,
              },
              { default: () => "Go to login" }
            ),
          ]),
      });
    },
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
