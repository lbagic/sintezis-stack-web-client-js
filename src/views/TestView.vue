<script setup>
import BaseInput from "../components/base/BaseInput.vue";
import { useFormData } from "../components/base/input.ctl";

const form = useFormData({
  text: "",
  password: "",
  search: "",
  tel: "",
  url: "",
  color: "",
  number: null,
  range: null,
  checkbox: false,
  checkboxMulti: [],
  radio: null,
  file: "",
  textarea: "",
  select: null,
  datetime_local: "",
  date: "",
  time: "",
  month: "",
});
</script>

<template>
  <form
    @submit.prevent
    ref="formRef"
    class="snt-grid"
    style="padding: 1rem; grid-template-columns: 1fr 1fr"
  >
    <div>
      <BaseInput
        placeholder="placeholder"
        v-model="form.model.text"
        label="text"
        required
      />
      <BaseInput
        placeholder="placeholder"
        v-model="form.model.password"
        type="password"
        label="password"
        required
      />
      <BaseInput
        placeholder="placeholder"
        v-model="form.model.search"
        type="search"
        label="search"
      />
      <BaseInput
        placeholder="placeholder"
        v-model="form.model.tel"
        type="tel"
        label="tel"
      />
      <BaseInput
        placeholder="placeholder"
        v-model="form.model.url"
        type="url"
        label="url"
      />
      <BaseInput
        placeholder="placeholder"
        v-model="form.model.color"
        type="color"
        label="color"
      />
      <BaseInput
        placeholder="placeholder"
        v-model="form.model.number"
        type="number"
        label="number"
      />
      <BaseInput
        placeholder="placeholder"
        v-model="form.model.range"
        type="range"
        label="range"
      />
      <BaseInput
        placeholder="placeholder"
        v-model="form.model.checkbox"
        type="checkbox"
        label="checkbox toggle"
        label-placement="inline start"
        hint="I am a hint"
      />
      <BaseInput
        placeholder="placeholder"
        v-model="form.model.checkboxMulti"
        type="checkbox"
        label="multi checkbox - John"
        value="John"
      />
      <BaseInput
        placeholder="placeholder"
        v-model="form.model.checkboxMulti"
        type="checkbox"
        label="multi checkbox - Sinclair"
        value="Sinclair"
      />
      <BaseInput
        placeholder="placeholder"
        v-model="form.model.checkboxMulti"
        type="checkbox"
        label="multi checkbox - Dom"
        value="Dom"
      />
      <BaseInput
        placeholder="placeholder"
        v-model="form.model.radio"
        type="radio"
        label="radio one"
        value="Radio box 1"
      />
      <BaseInput
        placeholder="placeholder"
        v-model="form.model.radio"
        type="radio"
        label="radio two"
        value="Radio box 2"
      />
      <BaseInput
        placeholder="placeholder"
        v-model="form.model.file"
        type="file"
        label="file"
      />
      <BaseInput
        placeholder="placeholder"
        v-model="form.model.textarea"
        type="textarea"
        label="textarea"
      />
      <BaseInput
        placeholder="placeholder"
        v-model="form.model.select"
        type="select"
        label="select"
      />
      <BaseInput
        placeholder="placeholder"
        v-model="form.model.datetime_local"
        type="datetime-local"
        label="datetime-local"
      />
      <BaseInput
        placeholder="placeholder"
        v-model="form.model.date"
        type="date"
        label="date"
      />
      <BaseInput
        placeholder="placeholder"
        v-model="form.model.time"
        type="time"
        label="time"
      />
      <BaseInput
        placeholder="placeholder"
        v-model="form.model.month"
        type="month"
        label="month"
      />
      <button type="submit" class="snt-button primary">submit</button>
    </div>
    <pre style="font-size: 10px">FORM: {{ form }}</pre>
  </form>
</template>

<style scoped lang="scss"></style>
