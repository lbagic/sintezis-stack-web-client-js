<script setup>
import { useCssVar } from "@vueuse/core";
import { _toastCtl } from "./toast.ctl.js";

const prefix = useCssVar("--prefix");

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
        ? `${prefix}toast-transition-top`
        : `${prefix}toast-transition-bottom`
    "
    tag="div"
    :class="`${prefix}toast-wrapper`"
    :key="position"
    :data-position="position"
  >
    <div
      v-for="toast in toastList"
      :class="`${prefix}toast`"
      :key="toast.id"
      :data-type="toast.type"
      :data-closable="toast.closable"
      @click="onClick(toastList, toast)"
    >
      {{ toast.message }}
      <button :class="`${prefix}close-icon`"></button>
    </div>
  </TransitionGroup>
</template>

<style scoped lang="scss"></style>
