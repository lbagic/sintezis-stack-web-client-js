<script setup>
import BaseInput from "@/components/base/input/BaseInput.vue";
import { useFormData, _inputCtl } from "@/components/base/input/input.ctl";
import { grpc } from "@/services/api/grpc";
import { reactive } from "vue";

const types = Object.keys(_inputCtl.components);
// const types = ["select"];
const model = useFormData(Object.fromEntries(types.map((type) => [type, ""])));
// const watchFn = () => ({ Marko: 256, Ivan: 25 });
const opts = reactive({ aaa: "one", bbb: "two" });
setTimeout(() => (opts.city = 22), 1000);
const search = (search) =>
  grpc.CountryService.getAll({ search }).then((res) =>
    (res.countries ?? []).forEach((el) => (opts[el.name] = el.id))
  );

const fm = useFormData({ text: 22 });
const vm = $ref(22);
</script>

<template>
  <pre>{{ { model } }}</pre>
  <form
    class="snt-container snt-grid"
    style="--gtc: 1fr 1fr 1fr"
    @submit.prevent
  >
    <BaseInput :options="opts" v-model="fm.model.text" @search="search" />
    <BaseInput :options="opts" v-model="vm" @search="search" />
    <BaseInput
      v-for="t in types"
      :key="t"
      :type="t"
      v-model="model.model[t]"
      :label="t"
      :options="opts"
      required
    />
    <button>submit</button>
  </form>
</template>

<style scoped lang="scss"></style>
