<script setup>
import BaseInput from "@/components/base/input/BaseInput.vue";
import { useFormData } from "@/components/base/input/input.ctl";
import { toast } from "@/components/base/toast/toast.ctl";
import { usePromise } from "@/utils/usePromise";
import { useAccountStore } from "../accountStore";

const form = useFormData({
  email: "",
  password: "",
});

const accountStore = useAccountStore();
const login = usePromise(accountStore.login);
async function onLogin() {
  try {
    await login.execute(form.data);
    toast.success("Logged in");
  } catch {
    toast.danger("Failed to log in");
  }
}
</script>

<template>
  <div class="snt-container snt-flex center h-full">
    <form @submit.prevent class="snt-container-s">
      <fieldset class="snt-card primary snt-grid">
        <legend>Login</legend>
        <BaseInput
          required
          type="email"
          label="Email"
          name="username"
          autocomplete="username"
          v-model="form.model.email"
        />
        <BaseInput
          required
          type="password"
          label="Password"
          name="password"
          autocomplete="password"
          v-model="form.model.password"
          minlength="6"
        />
        <button
          class="snt-button primary expand small"
          style="margin-top: 1rem"
          @click="onLogin"
          :disabled="!form.isValid || login.isPending"
        >
          Submit
        </button>
      </fieldset>
    </form>
  </div>
</template>

<style scoped lang="scss"></style>
