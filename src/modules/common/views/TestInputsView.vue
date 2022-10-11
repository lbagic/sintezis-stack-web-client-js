<script setup>
import { reactive } from "vue";
import { useFormData, _inputCtl } from "../../../components/base/input.ctl";
import BaseInput from "../../../components/base/BaseInput.vue";

const keys = Object.keys(_inputCtl.config).filter((el) => el !== "radio");
const models = Object.fromEntries(keys.map((key) => [key, ""]));
const formData = useFormData({ ...models });
const vModelData = reactive({ ...models });
const options = { a: 1, b: 2 };
</script>

<template>
  <div
    class="snt-container"
    style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem"
  >
    <div>
      <pre>{{ formData.data }}</pre>
      <BaseInput
        v-for="key in keys"
        :key="key"
        :type="key"
        :label="key"
        v-model="formData.model[key]"
        required
        :a="$image"
        :options="options"
      />
    </div>
    <div>
      <pre>{{ vModelData }}</pre>
      <BaseInput
        v-for="key in keys"
        :key="key"
        :type="key"
        :label="key"
        v-model="vModelData[key]"
        required
        :options="options"
      />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
