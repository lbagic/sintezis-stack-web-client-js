<script setup>
import { _toastCtl } from "./toast.ctl.js";
const data = _toastCtl.data;

function onClick(toastList, toast) {
  if (!toast.closable) return;
  const itemIndex = toastList.findIndex((el) => el === toast);
  if (itemIndex >= 0) toastList.splice(itemIndex, 1);
}
</script>

<template>
  <TransitionGroup
    v-for="(toastList, position) in data"
    :name="
      position.includes('top')
        ? `${$prefix}toast-transition-top`
        : `${$prefix}toast-transition-bottom`
    "
    tag="section"
    :class="`${$prefix}toast-wrapper`"
    :key="position"
    :data-position="position"
  >
    <output
      v-for="toast in toastList"
      role="status"
      :class="{
        [`${$prefix}toast`]: true,
        [`${$prefix}toast-closable`]: toast.closable,
        [`${$prefix}toast-type-${toast.type}`]: true,
      }"
      :key="toast.id"
      @click="onClick(toastList, toast)"
    >
      <p style="display: inline">{{ toast.message }}</p>
      <button :class="`${$prefix}close-icon`" aria-label="close"></button>
    </output>
  </TransitionGroup>
</template>

<style scoped lang="scss"></style>
