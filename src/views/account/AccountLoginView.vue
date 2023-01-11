<script setup>
import BaseInput from "@/components/base/input/BaseInput.vue";
import { useFormData } from "@/components/base/input/inputController";
import { useAccountStore } from "@/modules/account/accountStore";
import { feedback } from "@/utils/feedback";
import { usePromise } from "@/utils/usePromise";
import { NButton } from "naive-ui";

const form = useFormData({
  email: "",
  password: "",
});

const accountStore = useAccountStore();
const login = usePromise(accountStore.login);
async function onLogin() {
  try {
    await login.execute(form.data);
    feedback.message.success("Logged in");
  } catch {
    feedback.message.error("Failed to log in");
  }
}
</script>

<template>
  <div class="snt-container snt-flex center h-expand">
    <form @submit.prevent class="snt-container-s">
      <fieldset class="snt-card primary">
        <legend>Login</legend>
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
          v-model="form.model.password"
        />
        <NButton
          attr-type="submit"
          type="primary"
          size="large"
          class="w-expand"
          :disabled="!form.isValid || login.isPending"
          @click="onLogin"
        >
          Submit
        </NButton>
      </fieldset>
    </form>
  </div>
</template>

<style scoped lang="scss"></style>
