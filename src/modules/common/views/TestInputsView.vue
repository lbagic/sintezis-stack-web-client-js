<script setup>
import { reactive } from "vue";
import { useFormData, _inputCtl } from "../../../components/base/input.ctl";
import BaseInput from "../../../components/base/BaseInput.vue";

const types = Object.keys(_inputCtl.components);
const models = Object.fromEntries(types.map((key) => [key, ""]));
const formData = useFormData({ ...models });
const vModelData = reactive({ ...models });
const options = { one: "aaa", two: "bbb", three: 3, onezone: 11 };

function change() {
  formData.data.text = 11;
  vModelData.text = 11;
}
</script>

<template>
  <div
    class="snt-container"
    style="display: grid; grid-template-columns: 1fr 1fr"
  >
    <form @submit.prevent>
      <button @click="change">click</button>
      <pre>{{ formData.data }}</pre>
      <pre>{{ formData.isValid }}</pre>
      <BaseInput
        v-for="t in types"
        :key="t"
        :type="t"
        :label="t"
        v-model="formData.model[t]"
        :placeholder="t"
        :options="options"
        required
      />
      <button>submit</button>
    </form>
    <form @submit.prevent>
      <button @click="change">click</button>
      <pre>{{ vModelData }}</pre>
      <BaseInput
        v-for="t in types"
        :key="t"
        :type="t"
        :label="t"
        v-model="vModelData[t]"
        :options="options"
        required
      />
      <button>submit</button>
    </form>
  </div>
</template>

<style scoped lang="scss"></style>
