<script setup>
import DevelopmentLogin from "@/components/account/DevelopmentLogin.vue";
import BaseInput from "@/components/base/input/BaseInput.vue";
import { useFormData } from "@/components/base/input/inputController";
import { useAccountStore } from "@/modules/account/accountStore";
import { usePromise } from "@/utils/usePromise";
import { NButton } from "naive-ui";

const form = useFormData({
  email: "",
  password: "",
});

const accountStore = useAccountStore();
const login = usePromise(accountStore.login);
</script>

<template>
  <div class="snt-container snt-flex center height-expand">
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
          class="width-expand"
          :disabled="!form.isValid || login.isPending"
          @click="login.execute(form.data)"
        >
          Submit
        </NButton>
        <div class="snt-flex center">
          <DevelopmentLogin v-if="!$prod" style="justify-self: center" />
        </div>
      </fieldset>
    </form>
  </div>
</template>

<style scoped lang="scss"></style>
