<script setup>
import BaseInput from "@/components/base/BaseInput.vue";
import { useFormData } from "@/components/base/input.ctl";
import { toast } from "@/components/base/toast.ctl";
import { useRouter } from "vue-router";
import { accountService } from "../accountService";

const router = useRouter();

const form = useFormData({
  email: "",
  password: "",
});

async function login() {
  try {
    await accountService.login(form.data);
    toast.success("Logged in");
    router.push("/");
  } catch (e) {
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
          minlength="8"
        />
        <button
          class="snt-button primary expand small"
          style="margin-top: 1rem"
          @click="login"
          :disabled="!form.isValid"
        >
          Submit
        </button>
      </fieldset>
    </form>
  </div>
</template>

<style scoped lang="scss"></style>
