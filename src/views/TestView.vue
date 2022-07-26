<script setup>
import BaseInput, { useFormData } from "../components/base/BaseInput.vue";

const form = useFormData({
  text: "",
  password: "",
  search: "search",
  tel: "tel",
  url: "https://elude.co",
  color: "#f00",
  number: 1234,
  range: 50,
  checkbox: false,
  checkboxMulti: [],
  radio: null,
  file: "",
  textarea: "asdfasd",
  select: 2,
  datetime_local: "asdf",
  date: "asdf",
  time: "asdf",
  month: "asdf",
});

function onChange() {
  form.data.text = "qwe";
}
</script>

<template>
  <form
    @submit.prevent
    ref="formRef"
    class="snt-grid"
    style="padding: 1rem; grid-template-columns: 1fr 1fr"
  >
    <div>
      <button @click="onChange" class="snt-button primary">
        {{ form.isValid }}
      </button>
      <BaseInput
        v-model="form.model.text"
        label="text"
        required
        hint="I am a hint"
        :validator="(value) => (value !== 'asdf' ? 'Field is not asdf.' : true)"
      />
      <BaseInput
        v-model="form.model.password"
        type="password"
        label="password"
        required
      />
      <BaseInput v-model="form.model.search" type="search" label="search" />
      <BaseInput v-model="form.model.tel" type="tel" label="tel" />
      <BaseInput v-model="form.model.url" type="url" label="url" />
      <BaseInput v-model="form.model.color" type="color" label="color" />
      <BaseInput v-model="form.model.number" type="number" label="number" />
      <BaseInput v-model="form.model.range" type="range" label="range" />
      <BaseInput
        v-model="form.model.checkbox"
        type="checkbox"
        label="checkbox toggle"
        label-placement="inline start"
        hint="I am a hint"
      />
      <BaseInput
        v-model="form.model.checkboxMulti"
        type="checkbox"
        label="multi checkbox - John"
        value="John"
      />
      <BaseInput
        v-model="form.model.checkboxMulti"
        type="checkbox"
        label="multi checkbox - Sinclair"
        value="Sinclair"
      />
      <BaseInput
        v-model="form.model.checkboxMulti"
        type="checkbox"
        label="multi checkbox - Dom"
        value="Dom"
      />
      <BaseInput
        v-model="form.model.radio"
        type="radio"
        label="radio one"
        value="Radio box 1"
      />
      <BaseInput
        v-model="form.model.radio"
        type="radio"
        label="radio two"
        value="Radio box 2"
      />
      <BaseInput v-model="form.model.file" type="file" label="file" />
      <BaseInput
        v-model="form.model.textarea"
        type="textarea"
        label="textarea"
      />
      <BaseInput v-model="form.model.select" type="select" label="select" />
      <BaseInput
        v-model="form.model.datetime_local"
        type="datetime-local"
        label="datetime-local"
      />
      <BaseInput v-model="form.model.date" type="date" label="date" />
      <BaseInput v-model="form.model.time" type="time" label="time" />
      <BaseInput v-model="form.model.month" type="month" label="month" />
      <button type="submit" class="snt-button primary">submit</button>
    </div>
    <pre>FORM: {{ form }}</pre>
  </form>
</template>

<style scoped lang="scss"></style>
