<script setup lang="ts">
import { paletteColors } from "@/utils/colors";
import BaseButton from "../components/base/BaseButton.vue";
import BaseIcon from "../components/base/BaseIcon.vue";
import BaseModal from "../components/base/BaseModal.vue";
</script>

<template>
  <div class="wrap">
    <BaseButton disabled>Button</BaseButton>
    <BaseButton>Button</BaseButton>
    <BaseIcon icon="Search" button />
    <BaseModal class="dialog" open />
    <template v-for="col in paletteColors" :key="col">
      <div :style="`background-color: var(--snt-${col}-lighter)`">asdf</div>
      <div :style="`background-color: var(--snt-${col}-light)`">asdf</div>
      <div :style="`background-color: var(--snt-${col})`">asdf</div>
      <div :style="`background-color: var(--snt-${col}-dark)`">asdf</div>
      <div :style="`background-color: var(--snt-${col}-darker)`">asdf</div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.button-primary {
  transition: color 0.2s ease-in-out;
  color: red;
  &:hover {
    color: cyan;
  }
  &:focus {
    color: green;
  }
}
.wrap > div {
  padding: 1rem;
}
</style>
