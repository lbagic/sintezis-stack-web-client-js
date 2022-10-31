<script setup>
import { reactive } from "vue";
import { useFormData, _inputCtl } from "../../../components/base/input.ctl";
import BaseInput from "../../../components/base/BaseInput.vue";

const allowed = [];
const allTypes = Object.keys(_inputCtl.components);
const types = $computed(() =>
  allowed.length ? allTypes.filter((t) => allowed.includes(t)) : allTypes
);
const models = Object.fromEntries(types.map((key) => [key, ""]));
const fmodel = useFormData({ ...models });
const vmodel = reactive({ ...models });
const options = {
  a: "luka.bagi@gmail.com",
  one: "aaa",
  two: "bbb",
  3: "three",
  4: 44,
  onezone: 11,
};

function change() {
  types.forEach((t) => {
    fmodel.data[t] = 11;
    vmodel[t] = 11;
  });
}
</script>

<template>
  <button @click="change" class="snt-button light small expand">Change</button>
  <div
    class="snt-container"
    style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem"
  >
    <form @submit.prevent class="snt-grid">
      <pre>{{ fmodel.data }}</pre>
      <p>FormData v-models</p>
      <BaseInput
        v-for="t in types"
        :key="t"
        :label="t"
        :options="options"
        :placeholder="`enter ${t}`"
        :type="t"
        required
        v-model="fmodel.model[t]"
      />
      <button class="snt-button small primary expand">submit</button>
    </form>
    <form @submit.prevent class="snt-grid">
      <pre>{{ vmodel }}</pre>
      <p>Default v-models</p>
      <BaseInput
        v-for="t in types"
        :key="t"
        :label="t"
        :options="options"
        :placeholder="`enter ${t}`"
        :type="t"
        required
        v-model="vmodel[t]"
      />
      <button class="snt-button small primary expand">submit</button>
    </form>
  </div>
</template>

<style scoped lang="scss"></style>
